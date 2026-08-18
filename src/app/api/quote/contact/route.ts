import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is too short').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(30).optional(),
  message: z.string().min(10, 'Message is too short').max(2000),
  locale: z.enum(['es', 'en']).default('es'),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const result = contactSchema.safeParse(rawBody);

    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 });
    }

    const { fullName, company, email, phone, message, locale } = result.data;
    const isEs = locale === 'es';

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #0f172a;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          
          <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">NORTH MARITIME SERVICES</h1>
            <p style="margin: 6px 0 0; font-size: 12px; color: #94a3b8;">${isEs ? 'Mensaje desde Formulario Web de Contacto' : 'Message from Web Contact Form'}</p>
          </div>

          <div style="padding: 24px;">
            <h2 style="font-size: 16px; color: #0284c7; margin-top: 0;">
              ${isEs ? 'Nuevo Contacto / Consulta Comercial' : 'New Contact / Commercial Inquiry'}
            </h2>

            <table style="width: 100%; font-size: 13px; margin-bottom: 20px; background-color: #f1f5f9; border-radius: 8px; padding: 12px; border-collapse: separate; border-spacing: 0;">
              <tr>
                <td style="padding: 4px 8px;"><strong>${isEs ? 'Nombre' : 'Name'}:</strong> ${fullName}</td>
                <td style="padding: 4px 8px;"><strong>${isEs ? 'Empresa / Buque' : 'Company / Vessel'}:</strong> ${company || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 4px 8px;"><strong>${isEs ? 'Email' : 'Email'}:</strong> ${email}</td>
                <td style="padding: 4px 8px;"><strong>${isEs ? 'Teléfono' : 'Phone'}:</strong> ${phone || 'N/A'}</td>
              </tr>
            </table>

            <div style="margin-top: 16px; padding: 16px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px;">
              <strong style="font-size: 13px; color: #334155;">${isEs ? 'Mensaje / Requerimiento:' : 'Message / Requirement:'}</strong>
              <p style="margin: 8px 0 0; font-size: 14px; line-height: 1.5; color: #0f172a; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
              North Maritime Services • Puerto de Antofagasta, Chile
            </div>
          </div>
        </div>
      </div>
    `;

    // Envío a commercial@
    await resend.emails.send({
      from: 'North Maritime Services <commercial@northmaritimeservices.com>',
      to: ['commercial@northmaritimeservices.com'],
      replyTo: email,
      subject: `[CONTACTO WEB] Consulta de: ${fullName} ${company ? `(${company})` : ''}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error procesando contacto:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}