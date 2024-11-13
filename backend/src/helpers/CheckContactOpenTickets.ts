import { Op } from "sequelize";
import AppError from "../errors/AppError";
import Ticket from "../models/Ticket";
import User from "../models/User";

const CheckContactOpenTickets = async (contactId: number, whatsappId?: string): Promise<void> => {
  let ticket

  if (!whatsappId) {
    ticket = await Ticket.findOne({
      where: {
        contactId,
        status: { [Op.or]: ["open", "pending"] },

      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"]
        }
      ]
    });
  } else {
    ticket = await Ticket.findOne({
      where: {
        contactId,
        status: { [Op.or]: ["open", "pending"] },
        whatsappId
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name"]
        }
      ]
    });
  }

  if (ticket) {
    let error = {
      message: "ERR_CONTACT_HAS_OPEN_TICKET",
      data: {
        contactName: ticket.user.dataValues.name
      }
    }
    throw new AppError(JSON.stringify(error), 400);
  }
};

export default CheckContactOpenTickets;
