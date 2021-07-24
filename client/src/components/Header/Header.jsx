import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NoEncryptionIcon from "@material-ui/icons/NoEncryption";
import LockIcon from "@material-ui/icons/Lock";
// import AlertDialog from "./AlertDialog/AlertDialog";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
	root: {
		...theme.typography,
		color: "white",
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},

	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
		color: "white",
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	logo: {
		width: 36,
		height: 36,
	},
}));

export default function Header() {
	const userName = useSelector((state) => state.user?.name);
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const security = useSelector((state) =>
		state.sensors.items.find((el) => el.sensorType === "Motion Sensor"),
	);
	const securityStatus = useSelector((state) => state.sensors.items?.status);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<Typography className={classes.title} variant="h6" noWrap>
					<Link exact to="/auth/signup" className="nav-link">
						Sign Up
					</Link>
				</Typography>
			</MenuItem>
			<MenuItem>
				<Typography className={classes.title} variant="h6" noWrap>
					<NavLink exact to="/auth/signin" className="nav-link">
						Sign In
					</NavLink>
				</Typography>
			</MenuItem>
			<MenuItem>
				<Typography className={classes.title} variant="h6" noWrap>
					<NavLink exact to="/auth/signout" className="nav-link">
						Sign Out
					</NavLink>
				</Typography>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="down" ref={ref} {...props} />;
	});

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const AlertDialog = (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle color="red" id="alert-dialog-slide-title">
				{"Enemy Spotted"}
			</DialogTitle>
			<DialogContent>
				<img width="70%" height="70%" src="http://localhost:3000/alert.jpeg" alt="..img"></img>
				<DialogContentText id="alert-dialog-slide-description">Minus items</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Disagree
				</Button>
				<Button onClick={handleClose} color="primary">
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
						href="/home"
					>
						<img className={classes.logo} src="/logo.png" alt="..." />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						{userName ? userName : "Smart Home"}
					</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{userName ? (
							<>
								{securityStatus ? (
									<IconButton color="inherit">
										<Badge badgeContent={0} color="secondary">
											<LockIcon />
										</Badge>
									</IconButton>
								) : (
									<IconButton color="inherit">
										<Badge badgeContent={0} color="secondary">
											<NoEncryptionIcon />
										</Badge>
									</IconButton>
								)}
								<IconButton color="inherit" onClick={handleClickOpen}>
									<Badge badgeContent={security?.value} color="secondary">
										<NotificationsIcon />
									</Badge>
								</IconButton>
								<MenuItem>
									<Typography className={classes.title} variant="h6" noWrap>
										<NavLink
											exact
											to="/auth/signout"
											className="nav-link"
											style={{ color: "white", textDecoration: "none" }}
											activeStyle={{ color: "white", textDecoration: "none" }}
										>
											Sign Out
										</NavLink>
									</Typography>
								</MenuItem>
							</>
						) : (
							<>
								<MenuItem>
									<Typography className={classes.title} variant="h6" noWrap>
										<NavLink
											exact
											to="/auth/signin"
											className="nav-link"
											style={{ color: "white", textDecoration: "none" }}
											activeStyle={{ color: "white", textDecoration: "none" }}
										>
											Sign In
										</NavLink>
									</Typography>
								</MenuItem>
								<MenuItem>
									<Typography className={classes.title} variant="h6" noWrap>
										<NavLink
											exact
											to="/auth/signup"
											className="nav-link"
											style={{ color: "white", textDecoration: "none" }}
											activeStyle={{ color: "white", textDecoration: "none" }}
										>
											Sign Up
										</NavLink>
									</Typography>
								</MenuItem>
							</>
						)}
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}

			{open ? AlertDialog : <></>}
		</div>
	);
}
