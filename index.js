const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));

const sesiones = {};

function obtenerRespuesta(mensajeUsuario, telefono) {
    const texto = mensajeUsuario.toLowerCase().trim();
    const sesion = sesiones[telefono] || { paso: 'inicio' };

    // MENU PRINCIPAL
    if (texto === 'hola' || texto === 'inicio' || texto === 'menu' || texto === 'menú') {
        sesiones[telefono] = { paso: 'menu' };
        return `👋 ¡Bienvenido a *Editorial Letras de Colombia*!

Somos una editorial con más de 20 años llevando la literatura colombiana al mundo 📚

¿En qué puedo ayudarte hoy?

1️⃣ Catálogo de libros
2️⃣ Hacer un pedido
3️⃣ Estado de mi pedido
4️⃣ Precios y formas de pago
5️⃣ Eventos y ferias literarias
6️⃣ Distribuidores y puntos de venta
7️⃣ Trabaja con nosotros
8️⃣ Contacto y ubicación
9️⃣ Hablar con un asesor

Responde con el número de tu opción 👆`;
    }

    // OPCION 1 - CATALOGO
    if (texto === '1' || texto === 'catálogo' || texto === 'catalogo') {
        sesiones[telefono] = { paso: 'catalogo' };
        return `📚 *Catálogo Editorial Letras de Colombia*

Tenemos libros en estos géneros:

📖 A - Literatura colombiana
📖 B - Literatura latinoamericana
📖 C - Poesía
📖 D - Libros infantiles y juveniles
📖 E - Historia y ciencias sociales
📖 F - Académicos y universitarios
📖 G - Autoayuda y desarrollo personal

Escribe la letra del género que te interesa.
O escribe *menu* para volver al inicio.`;
    }

    if (sesion.paso === 'catalogo') {
        if (texto === 'a') {
            return `🇨🇴 *Literatura Colombiana — Destacados*

📕 *Río sin orillas* — Jorge Franco — $48.000
📗 *La vida de los muertos* — Piedad Bonnett — $52.000
📘 *El ruido de las cosas al caer* — Juan Gabriel Vásquez — $55.000
📙 *Fue así* — Tomás González — $44.000
📒 *Satanás* — Mario Mendoza — $46.000

¿Te interesa alguno? Escríbeme el título y te doy más información.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === 'b') {
            return `🌎 *Literatura Latinoamericana — Destacados*

📕 *Pedro Páramo* — Juan Rulfo — $38.000
📗 *Rayuela* — Julio Cortázar — $52.000
📘 *La casa de los espíritus* — Isabel Allende — $58.000
📙 *El túnel* — Ernesto Sábato — $42.000
📒 *Ficciones* — Jorge Luis Borges — $45.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === 'c') {
            return `✍️ *Poesía — Destacados*

📕 *Veinte poemas de amor* — Pablo Neruda — $32.000
📗 *Los versos del capitán* — Pablo Neruda — $35.000
📘 *Antología poética* — León de Greiff — $40.000
📙 *El libro de los abrazos* — Eduardo Galeano — $44.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === 'd') {
            return `👧 *Libros Infantiles y Juveniles — Destacados*

📕 *El principito* — Antoine de Saint-Exupéry — $28.000
📗 *Matilda* — Roald Dahl — $32.000
📘 *Manolito Gafotas* — Elvira Lindo — $30.000
📙 *El diario de un niño rata* — Jeff Kinney — $35.000
📒 *Cuentos de la selva* — Horacio Quiroga — $26.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === 'e') {
            return `📜 *Historia y Ciencias Sociales — Destacados*

📕 *Colombia una nación a pesar de sí misma* — David Bushnell — $62.000
📗 *Historia de Colombia* — Germán Arciniegas — $58.000
📘 *Así habló Colombia* — Varios autores — $55.000
📙 *La violencia en Colombia* — Orlando Fals Borda — $60.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === 'f') {
            return `🎓 *Libros Académicos y Universitarios*

📕 *Introducción al derecho* — Hernando Devis Echandía — $75.000
📗 *Fundamentos de administración* — Varios autores — $68.000
📘 *Estadística para administración* — Berenson — $82.000
📙 *Biología molecular* — Watson — $90.000

Manejamos textos para todas las carreras universitarias.
Escribe el nombre de tu carrera y te ayudo a encontrar el libro.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === 'g') {
            return `🌟 *Autoayuda y Desarrollo Personal — Destacados*

📕 *Los cuatro acuerdos* — Miguel Ruiz — $38.000
📗 *El poder del ahora* — Eckhart Tolle — $42.000
📘 *Hábitos atómicos* — James Clear — $52.000
📙 *La inteligencia emocional* — Daniel Goleman — $48.000
📒 *El monje que vendió su Ferrari* — Robin Sharma — $40.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
    }

    // OPCION 2 - HACER UN PEDIDO
    if (texto === '2' || texto === 'pedido' || texto === 'comprar') {
        sesiones[telefono] = { paso: 'pedido' };
        return `🛒 *¿Cómo hacer un pedido?*

Es muy fácil, tienes 3 opciones:

🌐 *Web:* www.editorialletras.com.co
📞 *Teléfono:* 601 234 5678
💬 *Por aquí mismo:* Escríbeme el título del libro que quieres y tu ciudad, y un asesor te contacta en menos de 2 horas.

📦 *Tiempos de entrega:*
- Bogotá: 1 a 2 días hábiles
- Otras ciudades: 3 a 5 días hábiles
- Internacional: 10 a 15 días hábiles

¿Quieres hacer tu pedido por WhatsApp? Escríbeme el título del libro y tu ciudad 📍
O escribe *menu* para volver al inicio.`;
    }

    // OPCION 3 - ESTADO DEL PEDIDO
    if (texto === '3' || texto === 'estado') {
        sesiones[telefono] = { paso: 'estado_pedido' };
        return `📦 *Consultar estado de pedido*

Por favor escríbeme tu número de pedido.
Ejemplo: *EL-2026-0081*

Lo encuentras en el correo de confirmación que te enviamos cuando hiciste la compra.
O escribe *menu* para volver al inicio.`;
    }

    if (sesion.paso === 'estado_pedido') {
        if (texto.startsWith('el-') || texto.startsWith('EL-')) {
            return `✅ *Pedido ${mensajeUsuario.toUpperCase()} encontrado*

📗 Título: Hábitos atómicos
📍 Estado: *En camino* 🚚
🏢 Transportadora: Servientrega
📅 Entrega estimada: 12 de mayo de 2026
🔍 Número de guía: SRV-887234

¿Necesitas algo más? Escribe *menu* para volver al inicio.`;
        } else {
            return `❌ No encontré ese número de pedido.

Verifica que el formato sea correcto. Ejemplo: *EL-2026-0081*
Si el problema continúa escribe *asesor* para hablar con una persona.
O escribe *menu* para volver al inicio.`;
        }
    }

    // OPCION 4 - PRECIOS Y PAGOS
    if (texto === '4' || texto === 'pago' || texto === 'pagos' || texto === 'precio') {
        return `💳 *Precios y Formas de Pago*

Nuestros libros van desde *$26.000 hasta $90.000 COP*

*Formas de pago disponibles:*
💵 Efectivo contra entrega
💳 Tarjeta débito y crédito
📱 Nequi y Daviplata
🏦 Transferencia bancaria
🌐 PSE en nuestra web

*Descuentos especiales:*
🎓 Estudiantes universitarios: 10% de descuento (con carné)
📦 Pedidos de 5 libros o más: 15% de descuento
🏫 Colegios y universidades: 20% de descuento

¿Tienes alguna pregunta sobre pagos? Escríbeme.
O escribe *menu* para volver al inicio.`;
    }

    // OPCION 5 - EVENTOS
    if (texto === '5' || texto === 'eventos' || texto === 'ferias') {
        return `🎪 *Eventos y Ferias Literarias 2026*

📅 *Próximos eventos:*

📖 *Feria del Libro de Bogotá (FILBo)*
📍 Corferias, Bogotá
🗓 26 de abril al 11 de mayo
🏠 Stand 412, Pabellón 4

📖 *Feria del Libro de Cali*
📍 Plaza Mayor, Cali
🗓 15 al 25 de junio

📖 *Festival de Literatura de Medellín*
📍 Parque Explora, Medellín
🗓 10 al 20 de julio

🎁 En todos nuestros eventos tenemos *descuentos hasta del 30%* y firma de libros con autores.

¿Quieres más información de algún evento?
O escribe *menu* para volver al inicio.`;
    }

    // OPCION 6 - DISTRIBUIDORES
    if (texto === '6' || texto === 'distribuidores' || texto === 'puntos de venta') {
        return `🏪 *Puntos de Venta y Distribuidores*

*Bogotá:*
📍 Librería Nacional — Calle 72 #10-34
📍 Librería Lerner — Av. Jiménez #4-35
📍 Panamericana — Centro Andino

*Medellín:*
📍 Librería Prometeo — El Poblado
📍 Jardín de Libros — Laureles

*Cali:*
📍 Librería Nacional — Chipichape
📍 Libros & Libros — Granada

*También nos encuentras en:*
🌐 www.editorialletras.com.co
📦 Rappi y Mercado Libre
📚 Amazon Colombia

¿Estás en otra ciudad? Escríbeme y te busco el distribuidor más cercano.
O escribe *menu* para volver al inicio.`;
    }

    // OPCION 7 - TRABAJA CON NOSOTROS
    if (texto === '7' || texto === 'trabajo' || texto === 'empleo') {
        return `💼 *Trabaja con Editorial Letras de Colombia*

Actualmente tenemos estas vacantes abiertas:

✍️ *Editor de contenidos* — Bogotá (presencial)
📱 *Community Manager* — Remoto
🎨 *Diseñador gráfico* — Bogotá (híbrido)
📦 *Auxiliar de bodega* — Bogotá (presencial)

*¿Eres autor y quieres publicar tu libro?*
📧 Envíanos tu manuscrito a: publicaciones@editorialletras.com.co

*Para aplicar a una vacante:*
📧 Hoja de vida a: rrhh@editorialletras.com.co
📋 Asunto del correo: nombre de la vacante

¿Tienes alguna pregunta?
O escribe *menu* para volver al inicio.`;
    }

    // OPCION 8 - CONTACTO
    if (texto === '8' || texto === 'contacto' || texto === 'ubicación' || texto === 'ubicacion') {
        return `📍 *Contacto y Ubicación*

🏢 *Editorial Letras de Colombia*
Calle 93 #15-28, Piso 3
Bogotá, Colombia

📞 *Teléfonos:*
- Bogotá: 601 234 5678
- Celular: 310 987 6543
- WhatsApp: Este número 😊

📧 *Correos:*
- Info general: info@editorialletras.com.co
- Pedidos: pedidos@editorialletras.com.co
- Autores: publicaciones@editorialletras.com.co

⏰ *Horario de atención:*
Lunes a viernes: 8:00 am – 6:00 pm
Sábados: 9:00 am – 1:00 pm

🌐 www.editorialletras.com.co
📱 Instagram: @editorialletras
Facebook: Editorial Letras de Colombia

O escribe *menu* para volver al inicio.`;
    }

    // OPCION 9 - ASESOR
    if (texto === '9' || texto === 'asesor' || texto === 'humano' || texto === 'persona') {
        return `👤 *Conectando con un asesor...*

Un miembro de nuestro equipo te atenderá pronto.

⏰ *Horario de atención:*
Lunes a viernes: 8:00 am – 6:00 pm
Sábados: 9:00 am – 1:00 pm

Si escribes fuera de horario, te responderemos al día siguiente hábil.

Mientras esperas puedes escribir *menu* para ver todas las opciones disponibles.`;
    }

    // RESPUESTA POR DEFECTO
    return `No entendí tu mensaje 😅

Escribe *hola* o *menu* para ver todas las opciones disponibles.
O escribe *asesor* si quieres hablar con una persona.`;
}

app.post('/webhook', (req, res) => {
    const mensajeUsuario = req.body.Body;
    const telefono = req.body.From;
    const respuesta = obtenerRespuesta(mensajeUsuario, telefono);

    res.set('Content-Type', 'text/xml');
    res.send(`
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Bot corriendo');
});