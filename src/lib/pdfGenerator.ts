import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  currency: 'CLP' | 'USD';
}

interface QuoteMeta {
  vesselName: string;
  port: string;
  contactEmail: string;
}

// Carga asíncrona de imagen a Base64 en el navegador
async function getBase64ImageFromUrl(imageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateQuotePDF(
  items: QuoteItem[],
  currency: 'CLP' | 'USD',
  locale: string,
  meta?: QuoteMeta
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const isEs = locale === 'es';
  const currLabel = currency === 'CLP' ? 'CLP' : 'USD';
  const quoteNumber = `NMS-${Date.now().toString().slice(-6)}`;
  const today = new Date().toLocaleDateString(isEs ? 'es-CL' : 'en-US');

  // 1. Cargar el Isotipo de NMS desde /public/Isotipo-NMS.png
  const isotipoBase64 = await getBase64ImageFromUrl('/Isotipo-NMS.png');

  // ==========================================
  // 1. ENCABEZADO CORPORATIVO (DISTRIBUCIÓN 2 COLUMNAS)
  // ==========================================
  
  // Banda superior en Azul Marino Profundo (#0F172A)
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 38, 'F');

  // Columna Izquierda: Isotipo NMS + Datos de Identidad
  if (isotipoBase64) {
    try {
      doc.addImage(isotipoBase64, 'PNG', 14, 6, 26, 26);
    } catch {
      // Continuar de forma segura si la imagen no responde
    }
  }

  const textStartX = isotipoBase64 ? 44 : 14;

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('NORTH MARITIME SERVICES SpA', textStartX, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225); // Slate 300
  doc.text(
    isEs 
      ? 'Logística Portuaria & Provisión de Rancho • Antofagasta y Mejillones'
      : 'Port Logistics & Ship Provisioning • Antofagasta & Mejillones',
    textStartX,
    21
  );
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('commercial@northmaritimeservices.com', textStartX, 27);

  // Columna Derecha: Control Documental & Folio
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(isEs ? 'COTIZACIÓN FORMAL' : 'OFFICIAL PROFORMA', 196, 14, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text(`N°: ${quoteNumber}`, 196, 20, { align: 'right' });
  doc.text(`${isEs ? 'Fecha' : 'Date'}: ${today}`, 196, 25, { align: 'right' });
  doc.setTextColor(251, 146, 60); // NMS Orange
  doc.text(isEs ? 'Validez: 7 días' : 'Validity: 7 days', 196, 30, { align: 'right' });

  // ==========================================
  // 2. BLOQUE DE DATOS DE LA OPERACIÓN / NAVE
  // ==========================================
  let startY = 46;

  if (meta && (meta.vesselName || meta.port || meta.contactEmail)) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(14, startY, 182, 18, 2, 2, 'FD');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(isEs ? 'NAVE / BUQUE:' : 'VESSEL:', 18, startY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(meta.vesselName || 'N/A', 48, startY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(isEs ? 'CONTACTO / AGENCIA:' : 'AGENT / CONTACT:', 110, startY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(meta.contactEmail || 'N/A', 148, startY + 6);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(isEs ? 'PUERTO DESTINO:' : 'PORT OF CALL:', 18, startY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(meta.port || 'Antofagasta / Mejillones', 48, startY + 13);

    startY += 24;
  }

  // ==========================================
  // 3. TABLA DE SUMINISTROS (ALINEACIÓN EMPAREJADA)
  // ==========================================
  const formatMoney = (amount: number) => {
    return amount.toLocaleString(isEs ? 'es-CL' : 'en-US', {
      minimumFractionDigits: currency === 'USD' ? 2 : 0,
      maximumFractionDigits: currency === 'USD' ? 2 : 0
    });
  };

  const tableData = items.map((item, index) => [
    String(index + 1).padStart(2, '0'),
    item.name,
    item.quantity.toString(),
    `$ ${formatMoney(item.unitPrice)}`,
    `$ ${formatMoney(item.quantity * item.unitPrice)}`
  ]);

  autoTable(doc, {
    startY: startY,
    head: [[
      'ÍTEM',
      isEs ? 'DESCRIPCIÓN DEL SUMINISTRO' : 'ITEM DESCRIPTION',
      isEs ? 'CANT.' : 'QTY',
      isEs ? `PRECIO UNITARIO (${currLabel})` : `UNIT PRICE (${currLabel})`,
      isEs ? `SUBTOTAL (${currLabel})` : `SUBTOTAL (${currLabel})`
    ]],
    body: tableData,
    theme: 'grid',
    styles: {
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
      cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 },
      valign: 'middle'
    },
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'center',
      lineColor: [30, 58, 138]
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [30, 41, 59]
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center' },
      1: { cellWidth: 'auto', halign: 'left' },
      2: { cellWidth: 18, halign: 'center' },
      3: { cellWidth: 38, halign: 'right' },
      4: { cellWidth: 38, halign: 'right' }
    }
  });

  // ==========================================
  // 4. LIQUIDACIÓN FINAL (BLOQUE INFERIOR DERECHO)
  // ==========================================
  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6;
  
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const iva = subtotal * 0.19;
  const grandTotal = subtotal + iva;

  // Cuadro de Liquidación
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(114, finalY, 82, 34, 2, 2, 'FD');

  // Título del Bloque
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(114, finalY, 82, 7, 2, 2, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text(isEs ? 'LIQUIDACIÓN FINAL' : 'FINAL SETTLEMENT', 118, finalY + 5);

  // 1. Cantidad Total
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(isEs ? 'Total Productos / Bultos:' : 'Total Items / Units:', 118, finalY + 12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${totalUnits} u.`, 192, finalY + 12, { align: 'right' });

  // 2. Subtotal
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(isEs ? 'Subtotal:' : 'Subtotal:', 118, finalY + 17);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`$ ${formatMoney(subtotal)}`, 192, finalY + 17, { align: 'right' });

  // 3. IVA (19%)
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('IVA (19%):', 118, finalY + 22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`$ ${formatMoney(iva)}`, 192, finalY + 22, { align: 'right' });

  // Línea divisoria del total
  doc.setDrawColor(226, 232, 240);
  doc.line(118, finalY + 25, 192, finalY + 25);

  // 4. Total Final
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(isEs ? 'Total Final:' : 'Final Total:', 118, finalY + 30.5);

  doc.setFontSize(9.5);
  doc.setTextColor(37, 99, 235); // Blue 600
  doc.text(`$ ${formatMoney(grandTotal)} ${currLabel}`, 192, finalY + 30.5, { align: 'right' });

  // ==========================================
  // 5. TÉRMINOS Y PIE DE PÁGINA
  // ==========================================
  const footerY = Math.max(finalY + 44, 265);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, footerY - 5, 196, footerY - 5);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text(
    isEs
      ? '• Cotización referencial sujeta a confirmación de stock y ventana operativa en muelle/fondeadero.'
      : '• Proforma quote subject to stock verification and delivery operational window at berth/anchorage.',
    14,
    footerY
  );
  doc.text(
    isEs
      ? '• Custodia y almacenamiento gratuito de repuestos y bultos hasta por 72 horas disponible en Antofagasta y Mejillones.'
      : '• 72-hour free storage and custody for ship spare parts available in Antofagasta and Mejillones.',
    14,
    footerY + 4
  );

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text(
    'NORTH MARITIME SERVICES SpA • Antofagasta y Mejillones, Chile • Operaciones 24/7',
    105,
    footerY + 11,
    { align: 'center' }
  );

  // Descarga del documento
  doc.save(`${quoteNumber}_NorthMaritimeServices.pdf`);
}