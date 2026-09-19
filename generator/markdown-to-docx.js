#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  TextRun,
} = require('docx');

function usage() {
  console.error('Usage: node generator/markdown-to-docx.js <input.md> <output.docx> [--title "Episode title"] [--publish-date "Month DD, YYYY"] [--copyright "© Steve and Erica Lawry 2021"]');
  process.exit(1);
}

function parseArguments(args) {
  if (args.length < 2) usage();

  const [inputPath, outputPath, ...options] = args;
  const metadata = {
    title: path.basename(inputPath, path.extname(inputPath)),
    publishDate: 'Undated',
    copyright: '© Steve and Erica Lawry 2021',
  };

  for (let index = 0; index < options.length; index += 2) {
    const value = options[index + 1];
    if (!value) usage();

    if (options[index] === '--title') metadata.title = value;
    else if (options[index] === '--publish-date') metadata.publishDate = value;
    else if (options[index] === '--copyright') metadata.copyright = value;
    else usage();
  }

  return { inputPath, outputPath, ...metadata };
}

function textRuns(markdown, quote = false) {
  return markdown.split(/(\*\*.*?\*\*)/).filter(Boolean).map((part) => {
    const bold = part.startsWith('**') && part.endsWith('**');
    return new TextRun({
      text: bold ? part.slice(2, -2) : part,
      bold,
      italics: quote,
      color: quote ? '3F4A54' : undefined,
    });
  });
}

function markdownParagraphs(markdown) {
  return markdown.trim().split(/\r?\n\s*\r?\n/).map((block) => {
    const lines = block.split(/\r?\n/);
    const isQuote = lines.every((line) => /^>\s?/.test(line));
    const text = lines.map((line) => line.replace(/^>\s?/, '').trim()).join(' ');

    return new Paragraph({
      children: textRuns(text, isQuote),
      spacing: { after: isQuote ? 150 : 180, line: 300 },
      indent: isQuote ? { left: 720, right: 360 } : undefined,
      border: isQuote ? {
        left: { color: '718096', size: 18, space: 12, style: BorderStyle.SINGLE },
      } : undefined,
      shading: isQuote ? { type: ShadingType.CLEAR, color: 'auto', fill: 'F3F6F8' } : undefined,
    });
  });
}

function footer(title, publishDate, copyright) {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { color: 'B8C2CC', size: 6, space: 6, style: BorderStyle.SINGLE } },
        spacing: { before: 120 },
        children: [
          new TextRun({ text: `${title}  •  ${publishDate}  •  ${copyright}  •  Page `, size: 16, color: '52606D' }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '52606D' }),
        ],
      }),
    ],
  });
}

async function main() {
  const { inputPath, outputPath, title, publishDate, copyright } = parseArguments(process.argv.slice(2));
  const markdown = fs.readFileSync(inputPath, 'utf8');
  const document = new Document({
    creator: 'Parakaleo Christian Ministries',
    title,
    description: `Transcript for ${title}`,
    sections: [{
      properties: {
        page: { margin: { top: 720, right: 720, bottom: 900, left: 720, footer: 360 } },
      },
      footers: { default: footer(title, publishDate, copyright) },
      children: markdownParagraphs(markdown),
    }],
  });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, await Packer.toBuffer(document));
  console.log(`Created ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
