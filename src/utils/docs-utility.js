import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const generateDocs = async (value, nameFile) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(value)],
          }),
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, nameFile + ".docx");
  });
};

const DocsUtility = {
  generateDocs,
};

export default DocsUtility;
