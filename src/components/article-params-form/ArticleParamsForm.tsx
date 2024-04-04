import React, { useState, useRef } from 'react';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Text } from 'components/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	defaultState,
} from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

export interface ArticleState {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
}

export interface ArticleParamsFormProps {
	articleState: ArticleState;
	updateArticleState: (newState: ArticleState) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	updateArticleState,
}) => {
	const [isAsideOpen, setIsAsideOpen] = useState(false);

	const [selectedOptions, setSelectedOptions] = useState({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const articleRef = useRef(null);

	useOutsideClickClose({
		isOpen: isAsideOpen,
		rootRef: articleRef,
		onChange: setIsAsideOpen,
	});

	const handleArrowButtonClick = () => {
		setIsAsideOpen(!isAsideOpen);
	};

	const handleButtonSubmitClick = (
		evt: React.MouseEvent<HTMLButtonElement>
	) => {
		evt.preventDefault();
		const newArticleState: ArticleState = {
			'--font-family': selectedOptions.fontFamily.value,
			'--font-size': selectedOptions.fontSize.value,
			'--font-color': selectedOptions.fontColor.value,
			'--bg-color': selectedOptions.backgroundColor.value,
			'--container-width': selectedOptions.contentWidth.value,
		};
		updateArticleState(newArticleState);
	};

	const handleButtonResetClick = () => {
		setSelectedOptions({
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		updateArticleState(defaultState);
	};

	return (
		<>
			<ArrowButton onClick={handleArrowButtonClick} isOpen={isAsideOpen} />
			<aside
				ref={articleRef}
				className={`${styles.container} ${
					isAsideOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						задайте параметры
					</Text>

					<Select
						selected={selectedOptions.fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(option) =>
							setSelectedOptions({ ...selectedOptions, fontFamily: option })
						}
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={selectedOptions.fontSize}
						title='размер шрифта'
						onChange={(option) =>
							setSelectedOptions({ ...selectedOptions, fontSize: option })
						}
					/>
					<Select
						selected={selectedOptions.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(option) =>
							setSelectedOptions({ ...selectedOptions, fontColor: option })
						}
					/>
					<Separator />
					<Select
						selected={selectedOptions.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(option) =>
							setSelectedOptions({
								...selectedOptions,
								backgroundColor: option,
							})
						}
					/>
					<Select
						selected={selectedOptions.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(option) =>
							setSelectedOptions({ ...selectedOptions, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleButtonResetClick}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={handleButtonSubmitClick}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
