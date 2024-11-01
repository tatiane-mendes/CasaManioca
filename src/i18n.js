import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {}
  },
  pt: {
    translation: {
      'Language changed': 'Idioma modificado',
      'Your tier': 'Tu nivel',
      'General': 'General',
      'Overview': 'Visión general',
      'Analytics': 'Analítica',
      'Finance': 'Finanzas',
      'Logistics': 'Logística',
      'Account': 'Cuenta',
      'Management': 'Gestión',
      'Customers': 'Clientes',
      'List': 'Lista',
      'Details': 'Detalles',
      'Edit': 'Editar',
      'Products': 'Productos',
      'Create': 'Crear',
      'Orders': 'Pedidos',
      'Invoices': 'Facturas',
      'Platforms': 'Plataforma',
      'Job Listings': 'Listado de trabajos',
      'Browse': 'Buscar',
      'Social Media': 'Redes sociales',
      'Profile': 'Perfil',
      'Feed': 'Fuente social',
      'Blog': 'Blog',
      'Post List': 'Lista de articulos',
      'Post Details': 'Detalles del articulo',
      'Post Create': 'Create articulo',
      'Apps': 'Aplicaciones',
      'Kanban': 'Kanban',
      'Mail': 'Correo',
      'Chat': 'Chat',
      'Calendar': 'Calendario',
      'Pages': 'Páginas',
      'Auth': 'Autenticación',
      'Register': 'Registrarse',
      'Login': 'Acceso',
      'Pricing': 'Precios',
      'Checkout': 'Pago',
      'Contact': 'Contacto',
      'Error': 'Error',
      'Need Help?': '¿Necesitas ayuda?',
      'Check our docs': 'Consulte nuestros documentos',
      'Documentation': 'Documentación'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
