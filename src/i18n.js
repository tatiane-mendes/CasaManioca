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
      'Inventory': 'Inventário',
      'Production': 'Produção',
      'Number of Products in Stock': 'Número de produtos em estoque',
      'Total Inventory': 'Inventário total',
      'Products List': 'Lista de produtos',
      'Products Sold': 'Produtos vendidos',
      'Good Morning': 'Bom dia',
      'Good Afternoon': 'Boa tarde',
      'Good Night': 'Boa noite',
      'Last update (newest)': 'Última atualização (mais recente)',
      'Last update (oldest)': 'Última atualização (mais antiga)',
      'Available stock (highest)': 'Estoque disponível (mais alto)',
      'Available stock (lowest)': 'Estoque disponível (mais baixo)',
      'Dashboard: Inventory List': 'Painel: Lista de inventário',
      'Sort By': 'Ordenar por',
      'Search inventories': 'Buscar inventários',
      'Name': 'Nome',
      'Product Name': 'Nome do produto',
      'Category': 'Categoria',
      'Quantity': 'Quantidade',
      'Stock Level': 'Nível de estoque',
      'Expiry Date': 'Data de validade',
      'Actions': 'Ações',
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
