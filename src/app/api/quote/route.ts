import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vesselName, port, contactEmail, items, total, currency, locale } = body;

    const isEs = locale === 'es';
    const currencyPrefix = currency === 'USD' ? 'USD $' : 'CLP $';

    // Construir tabla de ítems en HTML
    const itemsHtml = items.map((item: any) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 8px; font-size: 14px; color: #1e293b;">${item.name}</td>
        <td style="padding: 10px 8px; font-size: 14px; color: #1e293b; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 8px; font-size: 14px; color: #1e293b; text-align: right;">${currencyPrefix}${item.unitPrice.toLocaleString()}</td>
        <td style="padding: 10px 8px; font-size: 14px; color: #1e293b; text-align: right; font-weight: bold;">${currencyPrefix}${(item.quantity * item.unitPrice).toLocaleString()}</td>
      </tr>
    `).join('');

    // Plantilla de correo HTML formal
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #0f172a;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          
          <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">NORTH MARITIME SERVICES</h1>
            <p style="margin: 6px 0 0; font-size: 12px; color: #94a3b8;">${isEs ? 'Puerto de Antofagasta • Chile | Abastecimiento y Operaciones 24/7' : 'Antofagasta Port • Chile | 24/7 Ship Supply & Operations'}</p>
          </div>

          <div style="padding: 24px;">
            <h2 style="font-size: 16px; color: #0284c7; margin-top: 0;">
              ${isEs ? 'ORDEN DE COTIZACIÓN DE ABASTOS' : 'PROVISIONING QUOTE ORDER'}
            </h2>

            <table style="width: 100%; font-size: 13px; margin-bottom: 20px; background-color: #f1f5f9; border-radius: 8px; padding: 12px; border-collapse: separate; border-spacing: 0;">
              <tr>
                <td style="padding: 4px 8px;"><strong>${isEs ? 'Nave / Buque' : 'Vessel'}:</strong> ${vesselName}</td>
                <td style="padding: 4px 8px;"><strong>${isEs ? 'Puerto' : 'Port'}:</strong> ${port}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 4px 8px;"><strong>${isEs ? 'Correo de Contacto' : 'Contact Email'}:</strong> ${contactEmail}</td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <thead>
                <tr style="background-color: #0f172a; color: #ffffff; font-size: 12px;">
                  <th style="padding: 8px;">${isEs ? 'Ítem' : 'Item'}</th>
                  <th style="padding: 8px; text-align: center;">${isEs ? 'Cant.' : 'Qty'}</th>
                  <th style="padding: 8px; text-align: right;">${isEs ? 'Unitario' : 'Unit'}</th>
                  <th style="padding: 8px; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="margin-top: 20px; text-align: right;">
              <span style="font-size: 16px; font-weight: bold; color: #0f172a;">
                ${isEs ? 'Total Estimado' : 'Estimated Total'}: ${currencyPrefix}${total.toLocaleString()}
              </span>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
              ${isEs 
                ? 'Documento y solicitud procesada automáticamente por la plataforma web de North Maritime Services.' 
                : 'Document and request automatically processed by the North Maritime Services web platform.'}
            </div>
          </div>
        </div>
      </div>
    `;

    // 1. Envío al buzón del equipo comercial de NMS
    const commercialResult = await resend.emails.send({
      from: 'North Maritime Services <commercial@northmaritimeservices.com>',
      to: ['commercial@northmaritimeservices.com'],
      replyTo: contactEmail,
      subject: `[NUEVA COTIZACIÓN / ORDEN] Nave: ${vesselName} - Puerto: ${port}`,
      html: emailHtml,
    });

    if (commercialResult.error) {
      console.error('Error enviando a commercial@:', commercialResult.error);
    }

    // 2. Envío formal de confirmación al cliente/agente
    if (contactEmail) {
      const clientResult = await resend.emails.send({
        from: 'North Maritime Services <commercial@northmaritimeservices.com>',
        to: [contactEmail],
        replyTo: 'commercial@northmaritimeservices.com',
        subject: isEs 
          ? `Confirmación de Cotización de Abastos - ${vesselName}` 
          : `Provisioning Quotation Confirmation - ${vesselName}`,
        html: emailHtml,
      });

      if (clientResult.error) {
        console.error('Error enviando al cliente:', clientResult.error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error general en endpoint /api/quote:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}