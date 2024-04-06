import React, { useState, useRef, FormEvent } from 'react';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Text } from 'components/text';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

export interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	updateArticleState: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	updateArticleState,
}: ArticleParamsFormProps) => {
	const [isAsideOpen, setIsAsideOpen] = useState(false);

	const [selectedOptions, setSelectedOptions] = useState(defaultArticleState);

	const articleRef = useRef(null);

	useOutsideClickClose({
		isOpen: isAsideOpen,
		rootRef: articleRef,
		onChange: setIsAsideOpen,
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const newArticleState: ArticleStateType = {
			fontFamilyOption: selectedOptions.fontFamilyOption,
			fontSizeOption: selectedOptions.fontSizeOption,
			fontColor: selectedOptions.fontColor,
			backgroundColor: selectedOptions.backgroundColor,
			contentWidth: selectedOptions.contentWidth,
		};
		updateArticleState(newArticleState);
	};

	const handleButtonResetClick = () => {
		setSelectedOptions(defaultArticleState);
		updateArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				onClick={() => setIsAsideOpen(!isAsideOpen)}
				isOpen={isAsideOpen}
			/>
			<aside
				ref={articleRef}
				className={clsx(
					styles.container,
					isAsideOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						задайте параметры
					</Text>

					<Select
						selected={selectedOptions.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(option) =>
							setSelectedOptions({
								...selectedOptions,
								fontFamilyOption: option,
							})
						}
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={selectedOptions.fontSizeOption}
						title='размер шрифта'
						onChange={(option) =>
							setSelectedOptions({ ...selectedOptions, fontSizeOption: option })
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
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
