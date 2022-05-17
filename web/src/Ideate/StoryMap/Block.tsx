import React, { useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEllipsisV as dotsIcon, faPlus} from '@fortawesome/free-solid-svg-icons';

import Button from '../../objects/Button';
import { Text } from '../Cards/Block';
import UpdateBlock from './popups/UpdateBlock';

const Box = styled.div`
    padding: 7px 4px 4px 3px;
    margin: 4px;
    border-radius: 5px;
    text-align: left;
    display: flex;
    flex-direction: column;
`;

const Label = styled.p`
    margin: 5px;
    min-width: 28px;
    width: 28px;
    line-height: 28px;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    border-radius: 14px;
    -webkit-user-select: none;
    user-select: none;
`;

type Props = { 
    isDarkTheme: boolean,
    color: string,
    text: string,
    count: number,
    updateFile: (text: string, count: number) => void,
}

const Block = (props: Props) => {
    const [showUpdatePopup, toggleUpdatePopup] = useState(false);

    return (
        <Box className={props.color + '-view recent-block ' + props.color + '-color no-animation'}>
            {showUpdatePopup ? <UpdateBlock 
                color={props.color} 
                isDarkTheme={props.isDarkTheme}
                text={props.text}
                closePopup={() => toggleUpdatePopup(false)}
                updateFile={(text: string) => {
                    props.updateFile(text, props.count);
                    toggleUpdatePopup(false);
                }}
            /> : null}
            <Text className="grow">{props.text}</Text>
            <div className="row flex-space-between no-animation relative">
                <div className="row">
                    <Button
                        color={props.color}
                        border="no"
                        text={<FontAwesomeIcon 
                            icon={faTrash}
                        />}
                    />
                    <Button
                        color={props.color}
                        border="no"
                        text={<FontAwesomeIcon 
                            icon={faPen}
                        />}
                        onClick={() => toggleUpdatePopup(true)}
                    />
                    <Button
                        color={props.color}
                        border="no"
                        text={<FontAwesomeIcon 
                            icon={faPlus}
                        />}
                    />
                    <Button
                        color={props.color}
                        border="no"
                        text={<FontAwesomeIcon 
                            icon={dotsIcon}
                        />}
                    />
                </div>
                <Label className={props.color + ' white-color'}>{props.count}</Label>
            </div>
        </Box>
    )
}

export default Block;