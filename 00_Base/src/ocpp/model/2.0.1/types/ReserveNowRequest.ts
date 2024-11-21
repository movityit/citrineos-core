// Copyright 2023 S44, LLC
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

 
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import { ConnectorEnumType, IdTokenEnumType } from '../enums';
import { OcppRequest } from '../../../..';

export interface ReserveNowRequest extends OcppRequest {
  customData?: CustomDataType | null;
  /**
   * Id of reservation.
   *
   */
  id: number;
  /**
   * Date and time at which the reservation expires.
   *
   */
  expiryDateTime: string;
  connectorType?: ConnectorEnumType | null;
  idToken: IdTokenType;
  /**
   * This contains ID of the evse to be reserved.
   *
   */
  evseId?: number | null;
  groupIdToken?: IdTokenType | null;
}
/**
 * This class does not get 'AdditionalProperties = false' in the schema generation, so it can be extended with arbitrary JSON properties to allow adding custom data.
 */
export interface CustomDataType {
  vendorId: string;
  [k: string]: unknown;
}
/**
 * Contains a case insensitive identifier to use for the authorization and the type of authorization to support multiple forms of identifiers.
 *
 */
export interface IdTokenType {
  customData?: CustomDataType | null;
  /**
   * @minItems 1
   */
  additionalInfo?: [AdditionalInfoType, ...AdditionalInfoType[]] | null;
  /**
   * IdToken is case insensitive. Might hold the hidden id of an RFID tag, but can for example also contain a UUID.
   *
   */
  idToken: string;
  type: IdTokenEnumType;
}
/**
 * Contains a case insensitive identifier to use for the authorization and the type of authorization to support multiple forms of identifiers.
 *
 */
export interface AdditionalInfoType {
  customData?: CustomDataType | null;
  /**
   * This field specifies the additional IdToken.
   *
   */
  additionalIdToken: string;
  /**
   * This defines the type of the additionalIdToken. This is a custom type, so the implementation needs to be agreed upon by all involved parties.
   *
   */
  type: string;
}
