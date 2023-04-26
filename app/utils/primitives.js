import styled from "styled-components";
import { base } from "../../styles/baseStyles";

export const Heading = styled.h1`
	font-family: "Montserrat", sans-serif;
	font-size: 18px;
	${base};
`;

export const Main = styled.main`
	${base};
`;

export const Label = styled.label`
	margin-bottom: 10px;
	color: #204a34;
	font-family: "Montserrat";
	${base}
`;

export const Img = styled.img`
	display: block;
	max-width: 100%;
	height: auto;
	${base}
`;

export const Text = styled.span`
	font-family: "Montserrat", sans-serif;
	${base}
`;

export const StyledLink = styled.a`
	text-decoration: none;
	${base}
`;
