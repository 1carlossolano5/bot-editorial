const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));

const sesiones = {};

// Temporizadores por usuario
const timers = {};

function limpiarTimers(telefono) {
    if (timers[telefono]) {
        clearTimeout(timers[telefono].inactivo);
        clearTimeout(timers[telefono].cerrar);
    }
    timers[telefono] = {};
}

function obtenerRespuesta(mensajeUsuario, telefono) {
    const texto = mensajeUsuario.toLowerCase().trim();
    const sesion = sesiones[telefono] || { paso: 'inicio' };

    // SALIR
    if (texto === '0' || texto === 'salir' || texto === 'adios' || texto === 'adiós') {
        delete sesiones[telefono];
        limpiarTimers(telefono);
        return `👋 ¡Hasta luego! Gracias por contactar a *Editorial Letras de Colombia*.
Si necesitas algo más en el futuro, escríbenos. ¡Que disfrutes tu lectura! 📚`;
    }

    // RESPUESTA A "¿SIGUES AHÍ?"
    if (sesion.paso === 'esperando_confirmacion') {
        if (texto === 'sí' || texto === 'si' || texto === '1') {
            sesiones[telefono] = { paso: 'menu' };
            return `✅ ¡Perfecto! Continuamos.

¿En qué más puedo ayudarte?

1️⃣ Catálogo de libros
2️⃣ Hacer un pedido
3️⃣ Estado de mi pedido
4️⃣ Precios y formas de pago
5️⃣ Eventos y ferias literarias
6️⃣ Distribuidores y puntos de venta
7️⃣ Trabaja con nosotros
8️⃣ Contacto y ubicación
9️⃣ Hablar con un asesor
0️⃣ Salir

Responde con el número de tu opción 👆`;
        } else {
            delete sesiones[telefono];
            limpiarTimers(telefono);
            return `👋 ¡Hasta luego! Gracias por contactar a *Editorial Letras de Colombia*. ¡Que disfrutes tu lectura! 📚`;
        }
    }

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
0️⃣ Salir

Responde con el número de tu opción 👆`;
    }

    // OPCION 1 - CATALOGO
    if (texto === '1' || texto === 'catálogo' || texto === 'catalogo') {
        sesiones[telefono] = { paso: 'catalogo' };
        return `📚 *Catálogo Editorial Letras de Colombia*

Tenemos libros en estos géneros:

1️⃣ Literatura colombiana
2️⃣ Literatura latinoamericana
3️⃣ Poesía
4️⃣ Libros infantiles y juveniles
5️⃣ Historia y ciencias sociales
6️⃣ Académicos y universitarios
7️⃣ Autoayuda y desarrollo personal

Escribe el número del género que te interesa.
O escribe *menu* para volver al inicio.`;
    }

    if (sesion.paso === 'catalogo') {
        if (texto === '1') {
            return `🇨🇴 *Literatura Colombiana — Destacados*

📕 Río sin orillas — Jorge Franco — $48.000
📗 La vida de los muertos — Piedad Bonnett — $52.000
📘 El ruido de las cosas al caer — Juan Gabriel Vásquez — $55.000
📙 Fue así — Tomás González — $44.000
📒 Satanás — Mario Mendoza — $46.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === '2') {
            return `🌎 *Literatura Latinoamericana — Destacados*

📕 Pedro Páramo — Juan Rulfo — $38.000
📗 Rayuela — Julio Cortázar — $52.000
📘 La casa de los espíritus — Isabel Allende — $58.000
📙 El túnel — Ernesto Sábato — $42.000
📒 Ficciones — Jorge Luis Borges — $45.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === '3') {
            return `✍️ *Poesía — Destacados*

📕 Veinte poemas de amor — Pablo Neruda — $32.000
📗 Los versos del capitán — Pablo Neruda — $35.000
📘 Antología poética — León de Greiff — $40.000
📙 El libro de los abrazos — Eduardo Galeano — $44.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === '4') {
            return `👧 *Libros Infantiles y Juveniles — Destacados*

📕 El principito — Antoine de Saint-Exupéry — $28.000
📗 Matilda — Roald Dahl — $32.000
📘 Manolito Gafotas — Elvira Lindo — $30.000
📙 El diario de un niño rata — Jeff Kinney — $35.000
📒 Cuentos de la selva — Horacio Quiroga — $26.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === '5') {
            return `📜 *Historia y Ciencias Sociales — Destacados*

📕 Colombia una nación a pesar de sí misma — David Bushnell — $62.000
📗 Historia de Colombia — Germán Arciniegas — $58.000
📘 Así habló Colombia — Varios autores — $55.000
📙 La violencia en Colombia — Orlando Fals Borda — $60.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === '6') {
            return `🎓 *Libros Académicos y Universitarios*

📕 Introducción al derecho — Hernando Devis Echandía — $75.000
📗 Fundamentos de administración — Varios autores — $68.000
📘 Estadística para administración — Berenson — $82.000
📙 Biología molecular — Watson — $90.000

Escribe el nombre de tu carrera y te ayudo a encontrar el libro.
O escribe *menu* para volver al inicio.`;
        }
        if (texto === '7') {
            return `🌟 *Autoayuda y Desarrollo Personal — Destacados*

📕 Los cuatro acuerdos — Miguel Ruiz — $38.000
📗 El poder del ahora — Eckhart Tolle — $42.000
📘 Hábitos atómicos — James Clear — $52.000
📙 La inteligencia emocional — Daniel Goleman — $48.000
📒 El monje que vendió su Ferrari — Robin Sharma — $40.000

¿Te interesa alguno? Escríbeme el título.
O escribe *menu* para volver al inicio.`;
        }
    }

    // OPCION 2 - HACER UN PEDIDO
    if (texto === '2' || texto === 'pedido' || texto === 'comprar') {
        sesiones[telefono] = { paso: 'pedido' };
        return `🛒 *¿Cómo hacer un pedido?*

Es muy fácil, tienes 3 opciones:

🌐 Web: www.editorialletras.com.co
📞 Teléfono: 601 234 5678
💬 Por aquí mismo: Escríbeme el título del libro que quieres y tu ciudad.

📦 *Tiempos de entrega:*
- Bogotá: 1 a 2 días hábiles
- Otras ciudades: 3 a 5 días hábiles
- Internacional: 10 a 15 días hábiles

¿Quieres hacer tu pedido por WhatsApp? Escríbeme el título y tu ciudad 📍
O escribe *menu* para volver al inicio.`;
    }

    // OPCION 3 - ESTADO DEL PEDIDO
    if (texto === '3' || texto === 'estado') {
        sesiones[telefono] = { paso: 'estado_pedido' };
        return `📦 *Consultar estado de pedido*

Por favor escríbeme tu número de pedido.
Ejemplo: *EL-2026-0081*

Lo encuentras en el correo de confirmación.
O escribe *menu* para volver al inicio.`;
    }

    if (sesion.paso === 'estado_pedido') {
        if (texto.startsWith('el-')) {
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
O escribe *asesor* para hablar con una persona.`;
        }
    }

    // OPCION 4 - PRECIOS Y PAGOS
    if (texto === '4' || texto === 'pago' || texto === 'precio') {
        return `💳 *Precios y Formas de Pago*

Nuestros libros van desde *$26.000 hasta $90.000 COP*

*Formas de pago:*
💵 Efectivo contra entrega
💳 Tarjeta débito y crédito
📱 Nequi y Daviplata
🏦 Transferencia bancaria
🌐 PSE en nuestra web

*Descuentos especiales:*
🎓 Estudiantes: 10% (con carné)
📦 5 libros o más: 15%
🏫 Colegios y universidades: 20%

O escribe *menu* para volver al inicio.`;
    }

    // OPCION 5 - EVENTOS
    if (texto === '5' || texto === 'eventos' || texto === 'ferias') {
        return `🎪 *Eventos y Ferias Literarias 2026*

📖 *FILBo — Bogotá*
📍 Corferias — Stand 412, Pabellón 4
🗓 26 abril al 11 mayo

📖 *Feria del Libro de Cali*
📍 Plaza Mayor
🗓 15 al 25 de junio

📖 *Festival de Literatura — Medellín*
📍 Parque Explora
🗓 10 al 20 de julio

🎁 Descuentos hasta del 30% en todos los eventos.

O escribe *menu* para volver al inicio.`;
    }

    // OPCION 6 - DISTRIBUIDORES
    if (texto === '6' || texto === 'distribuidores') {
        return `🏪 *Puntos de Venta*

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

*Digital:*
🌐 www.editorialletras.com.co
📦 Rappi, Mercado Libre, Amazon, EBAY

O escribe *menu* para volver al inicio.`;
    }

    // OPCION 7 - TRABAJO
    if (texto === '7' || texto === 'trabajo' || texto === 'empleo') {
        return `💼 *Trabaja con Nosotros*

Vacantes abiertas:
✍️ Editor de contenidos — Bogotá
📱 Community Manager — Remoto
🎨 Diseñador gráfico — Bogotá
📦 Auxiliar de bodega — Bogotá

*¿Eres autor?*
📧 publicaciones@editorialletras.com.co

*Aplicar a vacante:*
📧 rrhh@editorialletras.com.co

O escribe *menu* para volver al inicio.`;
    }

    // OPCION 8 - CONTACTO
    if (texto === '8' || texto === 'contacto' || texto === 'ubicacion') {
        return `📍 *Contacto y Ubicación*

🏢 Calle 93 #15-28, Piso 3, Bogotá
📞 601 234 5678
📱 310 987 6543
📧 info@editorialletras.com.co
🌐 www.editorialletras.com.co

⏰ Lun–Vie: 8am–6pm
⏰ Sábados: 9am–1pm

📱 Instagram y Facebook: @editorialletras

O escribe *menu* para volver al inicio.`;
    }

    // OPCION 9 - ASESOR
    if (texto === '9' || texto === 'asesor' || texto === 'persona') {
        return `👤 *Conectando con un asesor...*

Un miembro del equipo te atenderá pronto.

⏰ Lun–Vie: 8am–6pm
⏰ Sábados: 9am–1pm

Fuera de horario respondemos al siguiente día hábil.
Escribe *menu* para ver las opciones disponibles.`;
    }

    // RESPUESTA POR DEFECTO
    return `No entendí tu mensaje 😅

Escribe *hola* o *menu* para ver todas las opciones.
O escribe *asesor* si quieres hablar con una persona.`;
}

app.post('/webhook', (req, res) => {
    const mensajeUsuario = req.body.Body;
    const telefono = req.body.From;

    // Limpiar timers anteriores cada vez que el usuario escribe
    limpiarTimers(telefono);

    const respuesta = obtenerRespuesta(mensajeUsuario, telefono);

    // Timer 2 minutos — preguntar si sigue activo
    timers[telefono].inactivo = setTimeout(() => {
        sesiones[telefono] = { paso: 'esperando_confirmacion' };
        // No podemos enviar proactivamente con Twilio sandbox
        // En producción con Meta API esto sí funciona
    }, 2 * 60 * 1000);

    // Timer 5 minutos — cerrar sesión
    timers[telefono].cerrar = setTimeout(() => {
        delete sesiones[telefono];
        delete timers[telefono];
    }, 5 * 60 * 1000);

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