import PDFDocument from 'pdfkit'

import { bioData } from '@/content/bio'

const PAGE = {
  width: 612,
  height: 792,
  margin: 42,
  labelWidth: 76,
  gutter: 14,
}

const COLORS = {
  ink: '#171717',
  muted: '#5f5f5f',
  rule: '#b9b9b9',
}

const contentX = PAGE.margin + PAGE.labelWidth + PAGE.gutter
const contentWidth =
  PAGE.width - PAGE.margin * 2 - PAGE.labelWidth - PAGE.gutter

function pdfText(value: string): string {
  return value
    .replace(/[\u2011\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u00b7/g, '|')
}

function ensureSpace(doc: PDFKit.PDFDocument, height: number) {
  if (doc.y + height > PAGE.height - PAGE.margin) doc.addPage()
}

function addSectionHeading(doc: PDFKit.PDFDocument, title: string) {
  ensureSpace(doc, 34)
  const top = doc.y + 5

  doc
    .strokeColor(COLORS.ink)
    .lineWidth(0.7)
    .moveTo(PAGE.margin, top)
    .lineTo(PAGE.margin + PAGE.labelWidth, top)
    .stroke()

  doc
    .fillColor(COLORS.ink)
    .font('Helvetica-Bold')
    .fontSize(7)
    .text(title.toUpperCase(), PAGE.margin, top + 6, {
      characterSpacing: 1.05,
      width: PAGE.labelWidth,
      lineBreak: false,
    })

  doc.y = top
  doc.x = contentX
}

function addBullet(doc: PDFKit.PDFDocument, text: string) {
  const y = doc.y
  doc
    .fillColor(COLORS.ink)
    .circle(contentX + 2, y + 4.1, 1.1)
    .fill()
    .font('Helvetica')
    .fontSize(7.8)
    .fillColor(COLORS.ink)
    .text(pdfText(text), contentX + 10, y, {
      width: contentWidth - 10,
      lineGap: 1.6,
    })
  doc.moveDown(0.14)
}

function addRule(doc: PDFKit.PDFDocument) {
  doc
    .strokeColor(COLORS.rule)
    .lineWidth(0.45)
    .moveTo(contentX, doc.y)
    .lineTo(contentX + contentWidth, doc.y)
    .stroke()
}

function addWork(doc: PDFKit.PDFDocument) {
  addSectionHeading(doc, 'Work')

  bioData.work.forEach((employer, employerIndex) => {
    const estimatedFirstRoleHeight = 29 + employer.roles[0].highlights.length * 18
    ensureSpace(doc, estimatedFirstRoleHeight)

    if (employerIndex > 0) {
      doc.moveDown(0.45)
      addRule(doc)
      doc.moveDown(0.5)
    }

    const employerY = doc.y
    doc
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor(COLORS.ink)
      .text(pdfText(employer.company), contentX, employerY, {
        width: contentWidth - 85,
      })

    if (employer.location) {
      doc
        .font('Helvetica')
        .fontSize(6.6)
        .fillColor(COLORS.muted)
        .text(pdfText(employer.location), contentX + contentWidth - 85, employerY + 1, {
          align: 'right',
          lineBreak: false,
          width: 85,
        })
    }

    doc.y = Math.max(doc.y, employerY + 11)

    employer.roles.forEach((role, roleIndex) => {
      if (roleIndex > 0) {
        ensureSpace(doc, 48)
        doc.moveDown(0.35)
      }

      const roleY = doc.y
      doc
        .font('Helvetica-Bold')
        .fontSize(7.4)
        .fillColor(COLORS.muted)
        .text(pdfText(role.title), contentX, roleY, {
          width: contentWidth - 70,
        })
        .font('Helvetica')
        .fontSize(6.6)
        .text(pdfText(role.dates), contentX + contentWidth - 70, roleY, {
          align: 'right',
          lineBreak: false,
          width: 70,
        })

      doc.y = Math.max(doc.y, roleY + 11)
      role.highlights.forEach((highlight) => addBullet(doc, highlight))
    })
  })
}

function addEducation(doc: PDFKit.PDFDocument) {
  doc.moveDown(0.2)
  addSectionHeading(doc, 'Education')

  bioData.education.forEach((item, index) => {
    ensureSpace(doc, 42)
    if (index > 0) doc.moveDown(0.5)

    const y = doc.y
    doc
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .fillColor(COLORS.ink)
      .text(pdfText(item.school), contentX, y, { width: contentWidth - 70 })
      .font('Helvetica')
      .fontSize(6.6)
      .fillColor(COLORS.muted)
      .text(pdfText(item.dates), contentX + contentWidth - 70, y, {
        align: 'right',
        lineBreak: false,
        width: 70,
      })

    doc
      .font('Helvetica-Bold')
      .fontSize(7.2)
      .fillColor(COLORS.muted)
      .text(pdfText(item.degree), contentX, doc.y + 1, { width: contentWidth })
      .font('Helvetica')
      .fontSize(7)
      .text(pdfText(item.detail), contentX, doc.y + 2, {
        lineGap: 1,
        width: contentWidth,
      })
  })
}

function addColumnHeading(
  doc: PDFKit.PDFDocument,
  title: string,
  x: number,
  y: number,
  width: number
) {
  doc
    .strokeColor(COLORS.ink)
    .lineWidth(0.7)
    .moveTo(x, y)
    .lineTo(x + width, y)
    .stroke()
    .font('Helvetica-Bold')
    .fontSize(6.6)
    .fillColor(COLORS.ink)
    .text(title.toUpperCase(), x, y + 7, {
      characterSpacing: 0.8,
      width,
    })

  return doc.y + 10
}

function addPublicationsColumn(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number
) {
  let cursor = addColumnHeading(doc, 'Publications & Patents', x, y, width)

  bioData.publications.forEach((item) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(6.3)
      .fillColor(COLORS.muted)
      .text(pdfText(item.type.toUpperCase()), x, cursor, { width })
    cursor = doc.y + 2
    doc
      .font('Helvetica-Bold')
      .fontSize(7.6)
      .fillColor(COLORS.ink)
      .text(pdfText(item.title), x, cursor, {
        link: item.href,
        lineGap: 1,
        underline: true,
        width,
      })
    cursor = doc.y + 2
    doc
      .font('Helvetica')
      .fontSize(6.8)
      .fillColor(COLORS.muted)
      .text(pdfText(item.detail), x, cursor, { lineGap: 1, width })
    cursor = doc.y + 10
  })

  return cursor
}

function addAwardsColumn(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number
) {
  let cursor = addColumnHeading(doc, 'Selected Awards', x, y, width)

  bioData.awards.forEach((award) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(7.6)
      .fillColor(COLORS.ink)
      .text(pdfText(award.name), x, cursor, { lineGap: 1, width })
    cursor = doc.y + 2
    doc
      .font('Helvetica')
      .fontSize(6.8)
      .fillColor(COLORS.muted)
      .text(pdfText(award.detail), x, cursor, { lineGap: 1, width })
    cursor = doc.y + 10
  })

  return cursor
}

function addOpenSourceColumn(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number
) {
  let cursor = addColumnHeading(doc, 'Selected Open Source', x, y, width)

  bioData.openSource.forEach((item) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(7.6)
      .fillColor(COLORS.ink)
      .text(pdfText(item.name), x, cursor, {
        link: item.href,
        underline: true,
        width,
      })
    cursor = doc.y + 2
    doc
      .font('Helvetica')
      .fontSize(6.8)
      .fillColor(COLORS.muted)
      .text(pdfText(item.detail), x, cursor, { lineGap: 1, width })
    cursor = doc.y + 10
  })

  return cursor
}

function addSkillsGrid(doc: PDFKit.PDFDocument, startY: number) {
  doc.y = startY
  addSectionHeading(doc, 'Skills')

  const gap = 16
  const cellWidth = (contentWidth - gap) / 2
  const rowStarts = [doc.y, doc.y]

  bioData.skills.forEach((skill, index) => {
    const column = index % 2
    const x = contentX + column * (cellWidth + gap)
    const y = rowStarts[column]

    doc
      .font('Helvetica-Bold')
      .fontSize(7.8)
      .fillColor(COLORS.ink)
      .text(pdfText(skill.category), x, y, { width: cellWidth })
      .font('Helvetica')
      .fontSize(7.2)
      .fillColor(COLORS.muted)
      .text(pdfText(skill.items), x, doc.y + 2, {
        lineGap: 1.3,
        width: cellWidth,
      })

    rowStarts[column] = doc.y + 12
  })
}

function addSecondaryPage(doc: PDFKit.PDFDocument) {
  doc.addPage()
  const columnsTop = PAGE.margin + 14
  const columnsGap = 15
  const columnsWidth = PAGE.width - PAGE.margin * 2
  const columnWidth = (columnsWidth - columnsGap * 2) / 3
  const firstX = PAGE.margin
  const secondX = firstX + columnWidth + columnsGap
  const thirdX = secondX + columnWidth + columnsGap

  const columnEnds = [
    addPublicationsColumn(doc, firstX, columnsTop, columnWidth),
    addAwardsColumn(doc, secondX, columnsTop, columnWidth),
    addOpenSourceColumn(doc, thirdX, columnsTop, columnWidth),
  ]

  addSkillsGrid(doc, Math.max(...columnEnds) + 12)
}

function addHeader(doc: PDFKit.PDFDocument) {
  const headerY = PAGE.margin

  doc
    .font('Helvetica-Bold')
    .fontSize(27)
    .fillColor(COLORS.ink)
    .text(bioData.name, PAGE.margin, headerY, {
      lineBreak: false,
      width: 250,
    })
    .fontSize(8)
    .fillColor(COLORS.muted)
    .text(pdfText(bioData.title), PAGE.margin, headerY + 33, {
      lineBreak: false,
      width: 280,
    })

  const contactX = 350
  const contactWidth = PAGE.width - PAGE.margin - contactX
  const contacts = [
    [bioData.location, undefined],
    [bioData.email, `mailto:${bioData.email}`],
    [bioData.website, `https://${bioData.website}`],
    ...bioData.links.map((link) => [link.label, link.href]),
  ] as Array<[string, string | undefined]>

  contacts.forEach(([label, href], index) => {
    doc
      .font(index === 0 ? 'Helvetica' : 'Helvetica-Bold')
      .fontSize(6.6)
      .fillColor(index === 0 ? COLORS.muted : COLORS.ink)
      .text(label, contactX, headerY + index * 9, {
        align: 'right',
        lineBreak: false,
        link: href,
        underline: Boolean(href),
        width: contactWidth,
      })
  })

  const ruleY = headerY + 54
  doc
    .strokeColor(COLORS.ink)
    .lineWidth(2)
    .moveTo(PAGE.margin, ruleY)
    .lineTo(PAGE.width - PAGE.margin, ruleY)
    .stroke()

  doc
    .font('Helvetica-Bold')
    .fontSize(8.4)
    .fillColor(COLORS.ink)
    .text(pdfText(bioData.summary), PAGE.margin, ruleY + 11, {
      lineGap: 2.4,
      width: PAGE.width - PAGE.margin * 2,
    })

  doc.moveDown(0.35)
}

export async function createResumePdf(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      autoFirstPage: false,
      bufferPages: true,
      compress: true,
      info: {
        Author: bioData.name,
        CreationDate: new Date(),
        Keywords: 'computer graphics, computer vision, data visualization, principal engineer',
        Subject: `${bioData.name} resume`,
        Title: `${bioData.name} - Resume`,
      },
      margins: {
        bottom: PAGE.margin,
        left: PAGE.margin,
        right: PAGE.margin,
        top: PAGE.margin,
      },
      size: 'LETTER',
    })

    const chunks: Buffer[] = []
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)

    doc.addPage()
    addHeader(doc)
    addWork(doc)
    addEducation(doc)
    addSecondaryPage(doc)

    const range = doc.bufferedPageRange()
    for (let index = range.start; index < range.start + range.count; index += 1) {
      doc.switchToPage(index)
      if (index > 0) {
        doc
          .font('Helvetica-Bold')
          .fontSize(6.5)
          .fillColor(COLORS.muted)
          .text(bioData.name, PAGE.margin, 22, { lineBreak: false })
      }
      doc
        .font('Helvetica')
        .fontSize(6.5)
        .fillColor(COLORS.muted)
        .text(`${index + 1} / ${range.count}`, PAGE.width - PAGE.margin - 40, 22, {
          align: 'right',
          lineBreak: false,
          width: 40,
        })
    }

    doc.end()
  })
}
