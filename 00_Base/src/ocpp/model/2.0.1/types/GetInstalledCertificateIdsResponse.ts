// Copyright 2023 S44, LLC
// Copyright Contributors to the CitrineOS Project
//
// SPDX-License-Identifier: Apache 2.0

 
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

import {
  GetCertificateIdUseEnumType,
  GetInstalledCertificateStatusEnumType,
  HashAlgorithmEnumType,
} from '../enums';
import { OcppResponse } from '../../../..';

export interface GetInstalledCertificateIdsResponse extends OcppResponse {
  customData?: CustomDataType | null;
  status: GetInstalledCertificateStatusEnumType;
  statusInfo?: StatusInfoType | null;
  /**
   * @minItems 1
   */
  certificateHashDataChain?:
    | [CertificateHashDataChainType, ...CertificateHashDataChainType[]]
    | null;
}
/**
 * This class does not get 'AdditionalProperties = false' in the schema generation, so it can be extended with arbitrary JSON properties to allow adding custom data.
 */
export interface CustomDataType {
  vendorId: string;
  [k: string]: unknown;
}
/**
 * Element providing more information about the status.
 *
 */
export interface StatusInfoType {
  customData?: CustomDataType | null;
  /**
   * A predefined code for the reason why the status is returned in this response. The string is case-insensitive.
   *
   */
  reasonCode: string;
  /**
   * Additional text to provide detailed information.
   *
   */
  additionalInfo?: string | null;
}
export interface CertificateHashDataChainType {
  customData?: CustomDataType | null;
  certificateHashData: CertificateHashDataType;
  certificateType: GetCertificateIdUseEnumType;
  /**
   * @minItems 1
   * @maxItems 4
   */
  childCertificateHashData?:
    | [CertificateHashDataType]
    | [CertificateHashDataType, CertificateHashDataType]
    | [
        CertificateHashDataType,
        CertificateHashDataType,
        CertificateHashDataType,
      ]
    | [
        CertificateHashDataType,
        CertificateHashDataType,
        CertificateHashDataType,
        CertificateHashDataType,
      ]
    | null;
}
export interface CertificateHashDataType {
  customData?: CustomDataType | null;
  hashAlgorithm: HashAlgorithmEnumType;
  /**
   * Hashed value of the Issuer DN (Distinguished Name).
   *
   *
   */
  issuerNameHash: string;
  /**
   * Hashed value of the issuers public key
   *
   */
  issuerKeyHash: string;
  /**
   * The serial number of the certificate.
   *
   */
  serialNumber: string;
}
