import { WAMessage, proto, WASocket } from "@whiskeysockets/baileys";
import WALegacySocket from "@whiskeysockets/baileys"
import * as Sentry from "@sentry/node";
import AppError from "../../errors/AppError";
import GetTicketWbot from "../../helpers/GetTicketWbot";
import GetWbotMessage from "../../helpers/GetWbotMessage";
import Message from "../../models/Message";
import Ticket from "../../models/Ticket";


import formatBody from "../../helpers/Mustache";

interface Request {
  body: string;
  messageId: string;
}

const EditWhatsAppMessage = async ({
  body,
  messageId,
}: Request): Promise<Message> => {
  
  const message = await Message.findByPk(messageId, {
    include: [
      {
        model: Ticket,
        as: "ticket",
        include: ["contact"]
      }
    ]
  });
  
  if (!message) {
    throw new AppError("No message found with this ID.");
  }

  const { ticket } = message;
  const msgFound = JSON.parse(message.dataJson);
  const messageToEdit = await GetWbotMessage(ticket, messageId);

  if (msgFound) {
      const wbot = await GetTicketWbot(ticket);
      const messageEdit = messageToEdit as proto.WebMessageInfo;

      console.log(body);
      try {
          const sentMessage = wbot.sendMessage(message.remoteJid, {
            edit:{
              id: message.id,
              remoteJid: message.remoteJid,
              participant: message.participant,
              fromMe: message.fromMe
          }, text: body})
          await message.update({ body });
          return message;
      } catch (err) {
          Sentry.captureException(err);
          console.log(err);
          throw new AppError("ERR_EDITING_WAPP_MSG");
      }
  }



};

export default EditWhatsAppMessage;
