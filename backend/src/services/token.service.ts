import * as jwt from "jsonwebtoken";
import ms from "ms";

import { envConfig } from "../configs/env.config";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, envConfig.JWT_ACCESS_SECRET, {
      expiresIn: envConfig.JWT_ACCESS_EXPIRATION as ms.StringValue,
    });
    //               For some reason, it doesn't work without explicitly casting to <ms.StringValue>,
    //               whereas it used to work before
    const refreshToken = jwt.sign(payload, envConfig.JWT_REFRESH_SECRET, {
      expiresIn: envConfig.JWT_REFRESH_EXPIRATION as ms.StringValue,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  public verifyToken(
    token: string,
    type: TokenTypeEnum
  ): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = envConfig.JWT_ACCESS_SECRET;
          break;
        case TokenTypeEnum.REFRESH:
          secret = envConfig.JWT_REFRESH_SECRET;
          break;
        default:
          throw new Error("Invalid token type");
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (err) {
      throw new ApiError(
        err.message.includes("Invalid token type")
          ? err.message
          : "Invalid token",
        401
      );
    }
  }
}

export const tokenService = new TokenService();
