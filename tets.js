<Container wipth="75%">
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
														onClick={(event) => handleClick(event, row.ip)}
														role="checkbox"
														aria-checked={isItemSelected}
														tabIndex={-1}
														key={row.ip}
														selected={isItemSelected}
													>
														<TableCell align="center">
															<Link to="/config/add-device"> {row.vendor}</Link>
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
								rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
