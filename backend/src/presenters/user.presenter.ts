import {
  IUser,
  IUserResponseDto,
} from "../interfaces/user.interface";

class UserPresenter {
  public toResponse(entity: IUser): IUserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
    };
  }
}

export const userPresenter = new UserPresenter();
