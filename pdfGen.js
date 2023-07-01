import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import {log} from 'console';
import path from 'path';

export function createPDF(result, folderPath, filename) {
  const filePath = path.join(folderPath, filename);
	let doc = new PDFDocument({ margin: 30, size: 'A4' });
    generateHeader(doc);
    doc.on('pageAdded', () =>{
        generateHeader(doc); // Invoke `generateHeader` function.
        // generateFooter(doc);
    })
	
  generateDocument(doc, result); // Fill the pdf with question and answers
	generateFooter(doc); // Invoke `generateFooter` function.

	doc.end();
	doc.pipe(fs.createWriteStream(filePath));
}
function generateHeader(doc) {
    const imagePath = path.join(process.cwd(), 'public/images', 'favicon-16x16.png');
	doc.image(imagePath, 50, 45, { width: 15 })
		.fillColor('#444444')
		.fontSize(15)
		.text('InterviewHacks.HQ', 110, 57)
		.moveDown(3);
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Top Inteview Questions on your fingertips.',
		50,
		780,
		{ align: 'center', y: doc.page.height - 10  },
	)
    ;
}
function generateDocument(doc, result) {
    for (let i = 0; i < result.length; i++) {
      const question = `Question ${i + 1}: ${result[i].ques}`;
      const answer = result[i].ans;
  
      // Set font size for questions to 18px and font style to bold
      doc.fontSize(10).font('Times-Bold');
      doc.text(question, { width: 410, align: 'left' });
  
      // Set font size for answers to 12px and font style to regular
      doc.fontSize(7).font('Times-Roman');
  
      // Split the answer into lines
      const answerLines = answer.split('\n');
  
      for (const line of answerLines) {
        doc.text(line, { width: 410, align: 'left', lineGap: 5 });
      }
  
      doc.moveDown();
    }
  }
  
