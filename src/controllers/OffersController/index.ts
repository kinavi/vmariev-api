import addDays from 'date-fns/addDays';
import { Offer } from '../../database/models';

export class OffersController {
  create = async (email: string, phone: string) => {
    const code = Math.round(Math.random() * 100000);
    const lifeDate = addDays(new Date(), 1);
    await Offer.create({
      code,
      email,
      phone,
      isConfirm: false,
      lifeDate: lifeDate.toISOString(),
    });
    return code;
  };

  get = async (email: string) => {
    const offer = await Offer.findOne({
      where: {
        email,
      },
    });
    return offer?.toJSON();
  };

  remove = async (email: string) => {
    const result = await Offer.destroy({
      where: {
        email,
      },
    });
    return !!result;
  };

  confirm = async (id: number) => {
    const [affectedCount] = await Offer.update(
      {
        isConfirm: true,
      },
      {
        where: {
          id,
        },
      }
    );
    return !!affectedCount;
  };

  checkConfirmEmail = async (email: string) => {
    const offers = await Offer.findOne({
      where: {
        email,
        isConfirm: true,
      },
    });
    return !!offers;
  };

  updateCode = async (email: string) => {
    const code = Math.round(Math.random() * 100000);
    const [affectedCount] = await Offer.update(
      { code },
      { where: { email, isConfirm: false } }
    );
    return !!affectedCount ? code : null;
  };
}
