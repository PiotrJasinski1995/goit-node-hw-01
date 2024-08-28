import "colors";
import { Command } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

const program = new Command();

program
  .option("-a, --action <type>", "action to perform")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "email address")
  .option("-p, --phone <phone>", "phone number");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("Unknown action type!".bgYellow.black);
      program.help();
  }
};

invokeAction(argv);
