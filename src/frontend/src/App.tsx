import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import Payouts from './pages/dashboard/Payouts';
import Accounts from './pages/dashboard/Accounts';
import Expenses from './pages/dashboard/Expenses';
import TradingOverview from './pages/dashboard/TradingOverview';
import TaxAuditReport from './pages/dashboard/TaxAuditReport';
import IncomeTaxCalculator from './pages/dashboard/IncomeTaxCalculator';
import Exchange from './pages/dashboard/Exchange';
import DiscountOffers from './pages/dashboard/DiscountOffers';
import Giveaways from './pages/dashboard/Giveaways';
import Tools from './pages/dashboard/Tools';
import P2PExchange from './pages/dashboard/P2PExchange';
import TradingTools from './pages/dashboard/TradingTools';
import ReviewsDisputes from './pages/dashboard/ReviewsDisputes';
import Compounding from './pages/dashboard/Compounding';
import Settings from './pages/dashboard/Settings';
import Affiliate from './pages/dashboard/Affiliate';
import Subscribe from './pages/Subscribe';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import AdminPanel from './pages/admin/AdminPanel';
import AdminPropFirms from './pages/admin/AdminPropFirms';
import AdminOffers from './pages/admin/AdminOffers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminDisputes from './pages/admin/AdminDisputes';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AdminAffiliateWithdrawals from './pages/admin/AdminAffiliateWithdrawals';
import { Toaster } from './components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: DashboardOverview,
});

const payoutsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/payouts',
  component: Payouts,
});

const accountsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/accounts',
  component: Accounts,
});

const expensesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/expenses',
  component: Expenses,
});

const tradingOverviewRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/trading-overview',
  component: TradingOverview,
});

const taxAuditReportRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/tax-audit-report',
  component: TaxAuditReport,
});

const incomeTaxCalculatorRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/income-tax-calculator',
  component: IncomeTaxCalculator,
});

const exchangeRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/exchange',
  component: Exchange,
});

const discountOffersRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/discount-offers',
  component: DiscountOffers,
});

const giveawaysRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/giveaways',
  component: Giveaways,
});

const toolsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/tools',
  component: Tools,
});

const p2pExchangeRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/p2p-exchange',
  component: P2PExchange,
});

const tradingToolsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/trading-tools',
  component: TradingTools,
});

const reviewsDisputesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/reviews-disputes',
  component: ReviewsDisputes,
});

const compoundingRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/compounding',
  component: Compounding,
});

const settingsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/settings',
  component: Settings,
});

const affiliateRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/affiliate',
  component: Affiliate,
});

const subscribeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subscribe',
  component: Subscribe,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccess,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailure,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicy,
});

const refundPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: RefundPolicy,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPanel,
});

const adminPropFirmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/prop-firms',
  component: AdminPropFirms,
});

const adminOffersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/offers',
  component: AdminOffers,
});

const adminReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/reviews',
  component: AdminReviews,
});

const adminDisputesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/disputes',
  component: AdminDisputes,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products',
  component: AdminProducts,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/users',
  component: AdminUsers,
});

const adminSubscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/subscriptions',
  component: AdminSubscriptions,
});

const adminAffiliateWithdrawalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/affiliate-withdrawals',
  component: AdminAffiliateWithdrawals,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    payoutsRoute,
    accountsRoute,
    expensesRoute,
    tradingOverviewRoute,
    taxAuditReportRoute,
    incomeTaxCalculatorRoute,
    exchangeRoute,
    discountOffersRoute,
    giveawaysRoute,
    toolsRoute,
    p2pExchangeRoute,
    tradingToolsRoute,
    reviewsDisputesRoute,
    compoundingRoute,
    settingsRoute,
    affiliateRoute,
  ]),
  subscribeRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  privacyPolicyRoute,
  refundPolicyRoute,
  adminRoute,
  adminPropFirmsRoute,
  adminOffersRoute,
  adminReviewsRoute,
  adminDisputesRoute,
  adminProductsRoute,
  adminUsersRoute,
  adminSubscriptionsRoute,
  adminAffiliateWithdrawalsRoute,
]);

const router = createRouter({ routeTree });

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
