import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import User from '../../models/User';

/**
|-----------------------------------------------------------------------------------------------------------------------
| Always put your styled components outside the render method else those components will be re-created everytime afresh.
|-----------------------------------------------------------------------------------------------------------------------
*/
const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5% 0;
`;

const Col = styled.div`
	flex: 1 1;
	margin: 5px;
`;

const CenterAligned = styled.div`
	text-align: center;
	position: relative;
`;

const SearchTextBox = styled.input`
	width: 50%;
	text-align: center;
	padding: 8px;
	border-radius: 25px;
	outline: none;
	border: 1px solid lightgrey;
`;

const Table = styled.table`
	text-align: justify;
	border: 1px solid lightgrey;
	width: 60%;
	margin: 0 auto;
	padding: 15px;
`;

/**
|--------------------------------------------------
| Extending element
|--------------------------------------------------
*/
const THWD1Percent = styled.th`width: 0.6%;`;
const THWD5Percent = styled.th`width: 2%;`;

/**
|--------------------------------------------------
| Extending component
|--------------------------------------------------
*/
// const TableHeadEnhanced=styled(TableHead)`
//
// `;

const Img20By20 = styled.img`
	height: 20px;
	width: 20px;
	cursor: pointer;
	text-align: center;
	margin: 5px;
`;

const EmptyUserList = styled.div`
	margin: 0 auto;
	width: 50%;
	font-weight: bold;
	font-size: 15px;
	text-align: center;
	background-color: lightgrey;
`;

const ImgAddUser = styled.img`
	position: absolute;
	height: 30px;
	cursor: pointer;
`;

const Anchor = styled(Link)`
	color: crimson;
	font-weight: 500;
`;

interface IDashboardProps extends RouteComponentProps {
	users: User[];
}

interface IDashboardState {
	users: User[];
}

const Dashboard: React.SFC<IDashboardProps> = (props) => {
	const { users, history } = props;
	const [ searchTerm, setSearchTerm ] = useState<string>('');
	const [ origUsers, setOrigUsers ] = useState<User[]>(users);
	const searchRef = useRef<any>();

	let filteredUsers = origUsers.filter(
		(u: User) =>
			u.firstName.toLowerCase().trim().indexOf(searchTerm.toLowerCase()) !== -1 ||
			u.lastName.toLowerCase().trim().indexOf(searchTerm.toLowerCase()) !== -1
	);

	useEffect(() => {
		searchRef.current.focus();
	}, []);

	const handleDelete = (e: React.FormEvent<EventTarget>, id: string) => {
		e.preventDefault();
		const tempUsers = filteredUsers.filter((u: User) => u.id !== id);
		setOrigUsers(tempUsers);
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<Fragment>
			<Container>
				<Col>
					<CenterAligned>
						<SearchTextBox
							type="text"
							placeholder="Search for first or last name..."
							value={searchTerm}
							onChange={handleOnChange}
							ref={searchRef}
						/>
						<ImgAddUser
							src="assets/images/add-user.png"
							alt="add user"
							onClick={() => history.push('/users')}
						/>
					</CenterAligned>
				</Col>
				<Col>
					{filteredUsers && filteredUsers.length ? (
						<Table>
							<thead>
								<tr>
									<THWD1Percent>S.No</THWD1Percent>
									<THWD5Percent>First Name</THWD5Percent>
									<THWD5Percent>Last Name</THWD5Percent>
									<THWD5Percent>Date Of Birth</THWD5Percent>
									<THWD1Percent />
								</tr>
							</thead>
							<tbody>
								{filteredUsers.map((u, i) => {
									// Object Destructing by fetching relevant properties of individual User object.
									const { id, firstName, lastName, dob } = u;
									return (
										<tr key={id}>
											<td>{i + 1})</td>
											<td>
												<Link to={`/users/${id}`}>{firstName}</Link>
											</td>
											<td>{lastName}</td>
											<td>{dob}</td>
											<td>
												<div>
													<Anchor to={`/users/${id}`}>
														<Img20By20 src="assets/images/edit.png" alt="edit" />
													</Anchor>
													<Img20By20
														src="assets/images/delete.png"
														alt="delete"
														onClick={(e) => handleDelete(e, id)}
													/>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					) : (
						<EmptyUserList>No user(s) exist.</EmptyUserList>
					)}
				</Col>
			</Container>
		</Fragment>
	);
};

// You have to use with the same name "mapStateToProps", which is the only name understood by Redux.
const mapStateToProps = (state: IDashboardState) => {
	return {
		users: state.users
	};
};

// Here, Connect is an HOC (Higher Order Component).
// And it passes part/chunk of the state as required to the component.
export default connect(mapStateToProps)(Dashboard);
