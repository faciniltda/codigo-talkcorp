import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import { getWbot } from "../../libs/wbot";
import AppError from "../../errors/AppError";

interface IOnWhatsapp {
  jid: string;
  exists: boolean;
}

const checker = async (number: string, wbot: any) => {
  const [validNumber] = await wbot.onWhatsApp(`${number}@s.whatsapp.net`);
  return validNumber;
};

const CheckContactNumber = async (
  number: string,
  companyId: number
): Promise<IOnWhatsapp> => {
  console.log("Checking contact number");
  const defaultWhatsapp = await GetDefaultWhatsApp(companyId);
  const wbot = getWbot(defaultWhatsapp.id);
  const isNumberExit = await checker(number, wbot);
  
  if (!isNumberExit || !isNumberExit.exists) {
    let error = {
      message: "ERR_CHECK_NUMBER",
    }
    throw new AppError(JSON.stringify(error), 400);
  }
  return isNumberExit;
};

export default CheckContactNumber;
