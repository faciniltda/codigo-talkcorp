import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";
import ContactCustomField from "../../models/ContactCustomField";

interface ExtraInfo extends ContactCustomField {
  name: string;
  value: string;
}

interface Request {
  name: string;
  number: string;
  email?: string;
  profilePicUrl?: string;
  companyId: number;
  extraInfo?: ExtraInfo[];
}

const CreateContactService = async ({
  name,
  number,
  email = "",
  companyId,
  extraInfo = []
}: Request): Promise<Contact> => {
  const numberExists = await Contact.findOne({
    where: { number, companyId }
  });

  if (numberExists) {
    let error = {
      message: "ERR_DUPLICATED_CONTACT",
    }
    throw new AppError(JSON.stringify(error), 400);
  }

  const contact = await Contact.create(
    {
      name,
      number,
      email,
      extraInfo,
      companyId
    },
    {
      include: ["extraInfo"]
    }
  );

  return contact;
};

export default CreateContactService;
