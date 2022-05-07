import React, { FormEvent, useState } from "react";

import { getClassCode, getFormatsFromType } from "../../App";
import { db } from "../../firebase/config";
import Select from "../../objects/Select";
import { Form, randomString, TextBox, TextBoxContainer } from "./Create";

type Props = { 
	color: string,
	isDarkTheme: boolean,
	changeColor: (arg0: string) => void,
    setErrorValue: (e: string) => void,
    setErrorDisplay: (e: boolean) => void,
	mode: string
}

export type Document = {
	mode: string,
	name: string,
	public: boolean,
	type: string,
	content: any[],
	users: string[],
	time?: any
}

export type DocumentWithId = {
	id: string,
	mode: string,
	name: string,
	public: boolean,
	type: string,
	content: any[],
	users: string[],
	time?: any
}

async function createFile(data: Document, id: string) {
    await db.collection('files').doc(id).set(data);
}

const NewFile = (props: Props) => {
	const userId = sessionStorage.getItem("userId");
	const formats = getFormatsFromType(props.mode);
	const [currentFormat, setCurrentFormat] = useState(formats[0]);

	var darkTheme = getClassCode("", props.isDarkTheme);

	const createNewFile = (event: FormEvent) => {
        event.preventDefault();
		try {
			const id = randomString(12);

			// @ts-ignore
			const elementsArray = [...event.target.elements];

			const formData = elementsArray.reduce((acc, element) => {
				if (element.id) {
					acc[element.id] = element.value.trim();
				}

				return acc;
			}, {});
			
            if (formData.name === '') throw("Please enter a document name.");

			const content: Document = {
				mode: props.mode,
				name: formData.name,
				public: false,
				type: currentFormat,
				content: [],
				users: [(userId ? userId : "Guest")]
			}

            createFile(content, id)
            .then(() => {
                window.location.href = '/' + currentFormat + '/' + id;
            })
            .catch(err => {
				props.setErrorValue(err);
                props.setErrorDisplay(true);
            })
        }
        catch (error) {
			// @ts-ignore
            props.setErrorValue(error);
			props.setErrorDisplay(true);
        }
    }

	return (
		<Form onSubmit={createNewFile} className="no-select">
			<TextBoxContainer className={"textbox flat-spaced"}>
				<TextBox id="name" className={props.color + "-color"} type="text" placeholder="Document Name"/>
			</TextBoxContainer>
			<Select 
				current={currentFormat}
				darkTheme={darkTheme} 
				color={props.color}
				onChangeHandler={e => {
					setCurrentFormat(e);
					props.changeColor(e);
				}}
				items={formats}
			/>
			<button 
				className={
					"button standard " + props.color + " " + darkTheme + "-color " 
					+ props.color + "-border round-5px small-spaced"
				}
			>
				Create
			</button>
		</Form>
	);
}

export default NewFile;