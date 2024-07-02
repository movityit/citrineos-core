// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

import { SequelizeRepository } from './Base';
import { ITariffRepository, TariffQueryString } from '../../../interfaces';
import {Tariff} from '../model/Tariff';
import { Sequelize } from 'sequelize-typescript';
import {SystemConfig, TariffKey} from '@citrineos/base';
import { ILogObj, Logger } from 'tslog';
import {TariffElement} from "../model/Tariff/TariffElement";

export class SequelizeTariffRepository extends SequelizeRepository<Tariff> implements ITariffRepository {
  constructor(config: SystemConfig, logger?: Logger<ILogObj>, sequelizeInstance?: Sequelize) {
    super(config, Tariff.MODEL_NAME, logger, sequelizeInstance);
  }

  async findByKey({id, countryCode, partyId}: TariffKey): Promise<Tariff | undefined> {
    return this.readOnlyOneByQuery({
      where: {id, countryCode, partyId},
      include: TariffElement,
    });
  }

  async findByStationId(stationId: string): Promise<Tariff | undefined> {
    return super.readOnlyOneByQuery({
      where: {
        stationId: stationId,
      },
    });
  }

  async upsertTariff(tariff: Tariff): Promise<Tariff> {
    return await this.s.transaction(async (transaction) => {
      const savedTariff = await this.readOnlyOneByQuery({
        where: {id: tariff.id, countryCode: tariff.countryCode, partyId: tariff.partyId},
        include: TariffElement,
        transaction
      });

      if (!savedTariff) {
        const createdTariff = await tariff.save({ transaction });
        this.emit('created', [createdTariff]);
        return createdTariff;
      }

      // TODO: optimize
      await TariffElement.destroy({where: {tariffId: savedTariff.id}, transaction});
      await TariffElement.bulkCreate(tariff.elementsData.map(element => ({...element, tariffId: savedTariff.id}), {transaction}));
      const updatedTariff = await savedTariff.set(tariff.data).save({transaction});

      this.emit('updated', [updatedTariff]);
      return updatedTariff;
    });
  }

  async readAllByQuerystring(query: TariffQueryString): Promise<Tariff[]> {
    return super.readAllByQuery({
      where: {
        ...(query.stationId && { stationId: query.stationId }),
        // ...(query.unit && { unit: query.unit }), // TODO: tariff dimension type?
        ...(query.id && { id: query.id }),
      },
    });
  }

  async deleteAllByQuerystring(query: TariffQueryString): Promise<Tariff[]> {
    if (!query.id && !query.stationId && !query.unit) {
      throw new Error('Must specify at least one query parameter');
    }
    return super.deleteAllByQuery({
      where: {
        ...(query.stationId && { stationId: query.stationId }),
        // ...(query.unit && { unit: query.unit }), // TODO: tariff dimension type?
        ...(query.id && { id: query.id }),
      },
    });
  }
}
