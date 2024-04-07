import React, { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [selectedOptions, setSelectedOptions] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedOptions.fontFamilyOption.value,
					'--font-size': selectedOptions.fontSizeOption.value,
					'--font-color': selectedOptions.fontColor.value,
					'--container-width': selectedOptions.contentWidth.value,
					'--bg-color': selectedOptions.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm updateArticleState={setSelectedOptions} />
			<Article />
		</div>
	);
};
