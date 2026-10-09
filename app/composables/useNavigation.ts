export type NavigationLink = {
	title: string;
	link: string;
	icon: string;
};

const links: NavigationLink[] = [
	{ title: 'Dashboard', link: '/', icon: 'mdi:view-dashboard-outline' },
	{ title: 'Реестр абонентов', link: '/subscribers', icon: 'mdi:account-group-outline' },
	{ title: 'Реестр заявок', link: '/applications', icon: 'mdi:clipboard-text-outline' },
	{ title: 'Контакт-центр', link: '/contact-center', icon: 'mdi:phone-outline' },
	{ title: 'Финансы и оплаты', link: '/finances', icon: 'mdi:currency-usd' },
	{ title: 'Показания', link: '/readings', icon: 'mdi:gauge' },
	{ title: 'Массовая замена БСГ', link: '/meter-replacement', icon: 'mdi:sync' },
	{ title: 'Полевые работы', link: '/fieldworks', icon: 'mdi:wrench-outline' },
	{ title: 'Документы/Регламенты', link: '/documents', icon: 'mdi:file-document-outline' },
	{ title: 'Отчеты', link: '/reports', icon: 'mdi:chart-box-outline' },
	{ title: 'KPI-просрочки', link: '/kpi', icon: 'mdi:alert-outline' },
];

export const useNavigation = () => ({ links });
