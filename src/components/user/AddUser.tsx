import React, { Fragment, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { RouteComponentProps } from 'react-router';

import User from '../../models/User';
import { AddUserAction } from '../../store/actions';
import { FormatToDisplayDate } from '../../Utilities';

/**
|-----------------------------------------------------------------------------------------------------------------------
| Always put your styled components outside the render method else those components will be re-created everytime afresh.
|-----------------------------------------------------------------------------------------------------------------------
*/
const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid lightgrey;
	margin: 50px auto;
	width: 50%;
	padding: 15px;
`;

const Row = styled.div`
	align-self: center;
	margin-bottom: 15px;
	width: 100%;
`;

const Col = styled.div`margin-bottom: 2px;`;

const Title = styled.div`
	text-align: center;
	border-bottom: 1px solid grey;
	display: flex;
	font-size: 20px;
	font-weight: bolder;
	padding-bottom: 10px;
`;

const Label = styled.span`
	font-size: 15px;
	font-weight: bold;
`;

const Input = styled.input`
	font-size: 15px;
	border-radius: 25px;
	border: 1px solid lightgrey;
	padding: 5px 10px;
	outline: none;
	width: 200px;
	height: 25px;
`;

const ButtonGroup = styled.div`
	display: flex;
	padding-top: 10px;
`;

const ButtonCol = styled.div`flex-basis: 16%;`;

interface ButtonStyled {
	primary?: boolean;
}

/* eslint-disable */
const Button =
	styled.button <
	ButtonStyled >
	`
	padding: 10px;
	border-radius: 25px;
	border: 1px solid lightgrey;
	background-color: ${(props) => (props.primary ? '#0000ffb3' : '#6c757d')};
	color: #fff;
	cursor: pointer;
	outline: none;
	width: 120px;
	font-size: 15px;
	font-weight: bold;
`;

interface IAddUserProps extends RouteComponentProps<{ id: string }> {
	AddUserAction: any;
}

const AddUser: React.SFC<IAddUserProps> = (props) => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ dob, setDob ] = useState(new Date().toISOString().split('T')[0]);
	const fNameRef = useRef<any>();

	useEffect(() => {
		fNameRef.current.focus();
	}, []);

	const handleSave = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const formattedDob = FormatToDisplayDate(dob);
		props.AddUserAction({
			id: uuidv4(),
			firstName,
			lastName,
			dob: formattedDob
		});
		props.history.push('/');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		switch (name) {
			case 'firstName':
				setFirstName(value);
				break;
			case 'lastName':
				setLastName(value);
				break;
			case 'dob':
				setDob(value);
				break;
			default:
				break;
		}
	};

	return (
		<Fragment>
			<Container>
				<Row>
					<Title>
						<span>Add User</span>
					</Title>
				</Row>
				<Row>
					<Col>
						<Label>First Name</Label>
					</Col>
					<Col>
						<Input type="text" value={firstName} name="firstName" onChange={handleChange} ref={fNameRef} />
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Last Name</Label>
					</Col>
					<Col>
						<Input type="text" value={lastName} name="lastName" onChange={handleChange} />
					</Col>
				</Row>
				<Row>
					<Col>
						<Label>Date Of Birth</Label>
					</Col>
					<Col>
						<Input type="date" value={dob} name="dob" onChange={handleChange} />
					</Col>
				</Row>
				<Row>
					<ButtonGroup>
						<ButtonCol>
							<Button primary onClick={handleSave}>
								Save
							</Button>
						</ButtonCol>
						<ButtonCol>
							<Button onClick={() => props.history.push('/')}>Cancel</Button>
						</ButtonCol>
					</ButtonGroup>
				</Row>
			</Container>
		</Fragment>
	);
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		AddUserAction: (user: User) => dispatch(AddUserAction(user))
	};
};

export default connect(null, mapDispatchToProps)(AddUser);
