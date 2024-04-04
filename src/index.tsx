import { createRoot } from 'react-dom/client';
import React, { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	ArticleState,
} from './components/article-params-form/ArticleParamsForm';
import { defaultState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [selectedOptions, setSelectedOptions] =
		useState<ArticleState>(defaultState);

	return (
		<div className={clsx(styles.main)} style={selectedOptions as CSSProperties}>
			<ArticleParamsForm
				articleState={selectedOptions}
				updateArticleState={setSelectedOptions}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
