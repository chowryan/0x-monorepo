import * as ethUtil from 'ethereumjs-util';

import { CoordinatorSignatureType } from './types';

export const signingUtils = {
    signMessage(message: Buffer, privateKey: Buffer, signatureType: CoordinatorSignatureType): Buffer {
        if (signatureType === CoordinatorSignatureType.EthSign) {
            const prefixedMessage = ethUtil.hashPersonalMessage(message);
            const ecSignature = ethUtil.ecsign(prefixedMessage, privateKey);
            const signature = Buffer.concat([
                ethUtil.toBuffer(ecSignature.v),
                ecSignature.r,
                ecSignature.s,
                ethUtil.toBuffer(signatureType),
            ]);
            return signature;
        } else if (signatureType === CoordinatorSignatureType.EIP712) {
            const ecSignature = ethUtil.ecsign(message, privateKey);
            const signature = Buffer.concat([
                ethUtil.toBuffer(ecSignature.v),
                ecSignature.r,
                ecSignature.s,
                ethUtil.toBuffer(signatureType),
            ]);
            return signature;
        } else {
            throw new Error(`${signatureType} is not a valid signature type`);
        }
    },
};
