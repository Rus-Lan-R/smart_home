import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Toolbar,
	Typography,
	Paper,
	IconButton,
	Tooltip,
	Container,
} from "@material-ui/core";

import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import LinearProgressBar from "../LinearProgressBar/LinearProgressBar";
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{ ip: "vendor", numeric: false, disablePadding: false, label: "Device" },
	{ ip: "ip", numeric: false, disablePadding: true, label: "IP adress" },
	{ ip: "mac", numeric: false, disablePadding: false, label: "MAC adress" },
];

function EnhancedTableHead(props) {
	const { classes, order, orderBy, onRequestSort } = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.ip}
						align={headCell.numeric ? "right" : "center"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.ip ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.ip}
							direction={orderBy === headCell.ip ? order : "asc"}
							onClick={createSortHandler(headCell.ip)}
						>
							{headCell.label}
							{orderBy === headCell.ip ? (
								<span className={classes.visuallyHipden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,

	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: "1 1 100%",
	},
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();

	return (
		<Toolbar>
			<Typography className={classes.title} variant="h6" ip="tableTitle" component="div">
				Devices
			</Typography>

			<Tooltip title="Filter list">
				<IconButton aria-label="filter list">
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		wipth: "100%",
	},
	paper: {
		wipth: "100%",
		marginBottom: theme.spacing(2),
	},
	table: {
		minWipth: 750,
	},
	visuallyHipden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hipden",
		padding: 0,
		position: "absolute",
		top: 20,
		wipth: 1,
	},
}));

export default function DevicesList() {
	const loader = useSelector((state) => state.loader);

	const devices = useSelector((state) => state.scanningIP);

	const classes = useStyles();
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("mac");
	const [selected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(15);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (ip) => selected.indexOf(ip) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, devices.length - page * rowsPerPage);

	return (
		<>
			{loader ? <LinearProgressBar /> : <></>}
			<Container width="75%">
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<EnhancedTableToolbar numSelected={selected.length} />
						<TableContainer>
							<Table
								className={classes.table}
								aria-labelledby="tableTitle"
								size={dense ? "small" : "medium"}
								aria-label="enhanced table"
							>
								<EnhancedTableHead
									classes={classes}
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onRequestSort={handleRequestSort}
									rowCount={devices.length}
								/>

								<TableBody>
									{stableSort(devices, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row.ip);

											return (
												<TableRow
													hover
													key={row.ip}
													role="checkbox"
													aria-checked={isItemSelected}
													tabIndex={-1}
													selected={isItemSelected}
												>
													<TableCell align="center">
														<Link to={`/home/config/add-device/${row.mac}`}> {row.vendor}</Link>
													</TableCell>

													<TableCell align="center">{row.ip}</TableCell>
													<TableCell align="center">{row.mac}</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 15, 25, 50, 100]}
							component="div"
							count={devices.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Paper>
				</div>
			</Container>
		</>
	);
}
