import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";
import "colors";

const contactsPath = "./db/contacts.json";

export const listContacts = () => {
  // find file by path
  const file = fs.readFile(path.resolve(contactsPath));
  // read file
  file.then((content) => {
    // convert file content for string
    const fileStr = content.toString();
    // convert data to JSON and put it to table
    console.table(JSON.parse(fileStr));
  });
};

export const getContactById = (contactId) => {
  // find file by path
  const file = fs.readFile(path.resolve(contactsPath));
  // read file
  file.then((content) => {
    // convert file content for string
    const fileStr = content.toString();
    // convert data to JSON
    const result = JSON.parse(fileStr);
    // filter JSON to find given contact
    const contact = result.find((contact) => contact.id === contactId);
    if (contact) {
      console.log(contact);
    } else {
      console.log("No record with that id!".bgYellow.black);
    }
  });
};

export const removeContact = (contactId) => {
  // find file by path
  const file = fs.readFile(path.resolve(contactsPath));
  // read file
  file.then((content) => {
    // convert file content for string
    const fileStr = content.toString();
    // convert data to JSON
    const result = JSON.parse(fileStr);
    // filter JSON to find given contact
    const afterDelete = result.filter((contact) => contact.id !== contactId);
    // save new data to file
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(afterDelete)).then(
      () => {
        console.log("Writing to file completed successfully.".green);
      }
    );
  });
};

export const addContact = (name, email, phone) => {
  // find file by path
  const file = fs.readFile(path.resolve(contactsPath));
  // find file by path
  file.then((content) => {
    // convert file content for string
    const fileStr = content.toString();
    // convert data to JSON
    const result = JSON.parse(fileStr);
    // add element to encoded array
    result.push({
      id: nanoid(21),
      name,
      email,
      phone,
    });
    // save new data to file
    fs.writeFile(path.resolve(contactsPath), JSON.stringify(result)).then(
      () => {
        console.log("Writing to file completed successfully.".green);
      }
    );
  });
};
