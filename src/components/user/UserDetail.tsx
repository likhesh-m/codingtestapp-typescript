import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import User from '../../models/User';
import { EditUserAction } from '../../store/actions';
import { FormatToDisplayDate } from '../../Utilities';

/**
|-----------------------------------------------------------------------------------------------------------------------
| Always put your styled components outside the render method else those components will be re-created everytime afresh.
|-----------------------------------------------------------------------------------------------------------------------
*/
const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px;
	border: 1px solid lightgray;
`;

const Col = styled.div`
	flex: 1 1;
	margin: 10px;
`;

const TitleRow = styled.div`
	text-align: center;
	border-bottom: 1px solid lightgrey;
	padding: 5px 0;
	background-color: lightgray;
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

const Title = styled.span`
	font-size: 18px;
	font-weight: bold;
`;

const LabelText = styled.div`
	font-size: 15px;
	font-weight: bold;
`;

const Img40By70 = styled.img`
	height: 40px;
	width: 70px;
	cursor: pointer;
	textAlign: center;
	margin: 5px;
`;

const DivWithFlex = styled.div`display: flex;`;

interface IUserDetailProps extends RouteComponentProps<{ id: string }> {
	user: User[];
	EditUserAction: any;
}

interface IUserDetailState {
	users: User[];
}

const UserDetail: React.SFC<IUserDetailProps> = (props) => {
	const user = props.user[0];
	const { firstName, lastName, dob } = user;

	const [ fName, setFName ] = useState<string>(firstName);
	const [ lName, setLName ] = useState<string>(lastName);
	const [ pDob, setDob ] = useState<string>(dob);
	const fNameRef = useRef<any>();

	const DateFormatterMemo = useMemo(
		() => {
			if (dob) {
				let newDob = new Date(dob);
				newDob = new Date(newDob.getTime() - newDob.getTimezoneOffset() * 60000);
				const newDobStr = newDob.toISOString().split('T')[0];
				setDob(newDobStr);
			}
		},
		[ dob ]
	);

	useEffect(() => {
		fNameRef.current.focus();
	}, []);

	useEffect(() => DateFormatterMemo, [ DateFormatterMemo ]);

	const handleSave = (e: React.MouseEvent<HTMLImageElement>) => {
		e.preventDefault();
		props.EditUserAction({
			id: user.id,
			firstName: fName,
			lastName: lName,
			dob: FormatToDisplayDate(pDob)
		});
		props.history.push('/');
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'firstName':
				setFName(value);
				break;
			case 'lastName':
				setLName(value);
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
				<TitleRow>
					<Title>User Details</Title>
				</TitleRow>
				<Col>
					<LabelText>First Name</LabelText>
					<div>
						<Input type="text" value={fName} name="firstName" onChange={handleOnChange} ref={fNameRef} />
					</div>
				</Col>
				<Col>
					<LabelText>Last Name</LabelText>
					<div>
						<Input type="text" value={lName} name="lastName" onChange={handleOnChange} />
					</div>
				</Col>
				<Col>
					<LabelText>Date Of Birth</LabelText>
					<div>
						<Input type="date" value={pDob} name="dob" onChange={handleOnChange} />
					</div>
				</Col>
				<DivWithFlex>
					<div>
						<Img40By70 src="../assets/images/save.jpg" alt="save" onClick={handleSave} />
					</div>
					<div>
						<Img40By70
							src="../assets/images/cancel.jpg"
							alt="cancel"
							onClick={() => props.history.push('/')}
						/>
					</div>
				</DivWithFlex>
			</Container>
		</Fragment>
	);
};

const mapStateToProps = (state: IUserDetailState, props: IUserDetailProps) => {
	// console.log(typeof state.user.users[0].id);
	// console.log(typeof +props.match.params.id);
	const user = state.users.filter((u) => u.id === props.match.params.id);
	return {
		user
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		EditUserAction: (user: User) => dispatch(EditUserAction(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
