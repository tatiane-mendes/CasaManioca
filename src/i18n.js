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
      'General': 'Geral',
      'Overview': 'Visão geral',
      'Analytics': 'Analítica',
      'Finance': 'Finanças',
      'Logistics': 'Logística',
      'Account': 'Conta',
      'Management': 'Gestão',
      'Customers': 'Clientes',
      'List': 'Lista',
      'Details': 'Detalhes',
      'Edit': 'Editar',
      'Products': 'Produtos',
      'Create': 'Criar',
      'Orders': 'Pedidos',
      'Invoices': 'Faturas',
      'Platforms': 'Plataforma',
      'Job Listings': 'Lista de trabalhos',
      'Browse': 'Buscar',
      'Social Media': 'Redes sociais',
      'Profile': 'Perfil',
      'Feed': 'Fuente social',
      'Blog': 'Blog',
      'Post List': 'Lista de articulos',
      'Post Details': 'Detalles del articulo',
      'Post Create': 'Create articulo',
      'Apps': 'Apps',
      'Kanban': 'Kanban',
      'Mail': 'Email',
      'Chat': 'Chat',
      'Calendar': 'Calendário',
      'Pages': 'Páginas',
      'Auth': 'Autenticação',
      'Register': 'Registrar-se',
      'Login': 'Login',
      'Pricing': 'Preços',
      'Checkout': 'Pago',
      'Contact': 'Contato',
      'Error': 'Erro',
      'Need Help?': 'Precisa de ajuda?',
      'Check our docs': 'Consulte nuestros documentos',
      'Documentation': 'Documentação',
      'Inventory': 'Inventário'
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
