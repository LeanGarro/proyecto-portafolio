# =========================================================
#  API para el formulario de contacto — Leandro Garro
#  Recibe datos desde el frontend y los envía por email.
#  Usa Flask + Flask-Mail (con Gmail).
# =========================================================

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
import datetime

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)  # Esto permite que el frontend (Vite) pueda llamar a la API

# ---------------------------------------------------------
#  Configuración para Gmail
#  Sacá estas claves del archivo .env
# ---------------------------------------------------------
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')       # Tu Gmail
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')   # Contraseña de aplicación
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER')

mail = Mail(app)

# ---------------------------------------------------------
#  Ruta para recibir el mensaje (el endpoint)
# ---------------------------------------------------------
@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # Validar que llegaron todos los campos
    if not name or not email or not message:
        return jsonify({'error': 'Faltan campos obligatorios'}), 400
    
    try:
        # Crear el correo
        msg = Message(
            subject=f'Nuevo mensaje de contacto desde tu portafolio',
            recipients=[os.getenv('EMAIL_USER')],  # Te llega a vos
            body=f"""
            📩 Nuevo mensaje desde tu portafolio

            Nombre: {name}
            Email: {email}
            Fecha: {datetime.datetime.now().strftime('%d/%m/%Y %H:%M')}

            Mensaje:
            {message}
            """,
            html=f"""
            <h3>📩 Nuevo mensaje desde tu portafolio</h3>
            <p><strong>Nombre:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Fecha:</strong> {datetime.datetime.now().strftime('%d/%m/%Y %H:%M')}</p>
            <hr>
            <p><strong>Mensaje:</strong></p>
            <p>{message}</p>
            """
        )
        mail.send(msg)
        
        return jsonify({'message': 'Mensaje enviado exitosamente'}), 200
        
    except Exception as e:
        print(f"Error al enviar email: {e}")
        return jsonify({'error': 'No se pudo enviar el mensaje'}), 500

# ---------------------------------------------------------
#  Ruta de prueba (opcional)
# ---------------------------------------------------------
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'status': 'API funcionando 🚀'}), 200

# ---------------------------------------------------------
#  Arrancar el servidor
# ---------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)