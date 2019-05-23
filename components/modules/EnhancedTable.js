import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';
import AlertDialog from './AlertDialog';
import StatusTabs from './StatusTabs';
import EnhancedTableToolbar from './EnhancedTableToolbar';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}



class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.id!=="opera"? <Tooltip
                  title="排序"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
                :
                row.label
                }
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: "100%",
    height: "auto",
    position: "relative",
    top: 50,
    
  },
  tableWrapper: {
    overflowX: 'auto',
    overflowY: "hidden"

  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [
     
    ],
    page: 0,
    rowsPerPage: 25,
    pending: false,
    dataCount: 0,
    dialogOpen: false,
    handleId: null,
    status: 'draft'
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n._id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    const { rowsPerPage } = this.state;
    this.loadData(page+1, rowsPerPage);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    const { page } = this.state;
    this.loadData(page+1, event.target.value);
  };

  loadData = (page=1, pagesize=25, status="draft") => {
    const { source } = this.props;
    const { data } = this.state;

    this.setState({
      pending: true,
      selected: [],
    });
    Axios.get(`/api/${source}?page=${page}&pagesize=${pagesize}&status=${status}`).then(
      response => {
        this.setState({
          data: [
            ...data.slice(0, (page-1)*pagesize),
            ...response.data,
            ...data.slice(page*pagesize, data.length)
          ],
          pending: false,
          page: page-1,
        });
        this.countItems(status);
      }
    )
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount(){

      const { initStatus } = this.props;
      const { page, rowsPerPage } = this.state;
      this.setState({
        pending: true,
        status: initStatus,
      });
      this.loadData(page+1, rowsPerPage, initStatus);
     
      
  }
  countItems = status => {
    Axios.get("/posts/count?status="+status).then(response=>{
      this.setState({
        dataCount: response.data,
      })
    });
  }
  handleDelete = (e, id) => {
    e.stopPropagation();
    this.setState({
      handleId: id,
      dialogOpen: true
    })

  } 
  handleRecover = (e, id) => {
    e.stopPropagation();
    Axios.patch(`/api/posts/${id}/draft`).then(
      response => {
        this.setState({
          status: "draft"
        })
      }
    )
    Axios.get("/posts/count").then(response=>{
      this.setState({
        dataCount: response.data,
      })
    });

  } 
  handleEdit = e => {
    e.stopPropagation();
  }

  handleComfirmDialogCancel = e => {
    this.setState({
      dialogOpen: false,
    })
  }

  handleComfirmDialogConfirm = e => {
    e.stopPropagation();
    const { handleId, status } = this.state;
    const callback = response => {
      const { page, rowsPerPage } = this.state;
      this.loadData(page+1, rowsPerPage, status);
    }
    this.setState({
      dialogOpen: false,
    })
    if(status === "deleted"){
      return Axios.delete("/api/posts", {
        params: {condition: {_id: handleId}}
      }).then(callback);
    }
    Axios.patch(`/api/posts/${handleId}/delete`).then(
      callback
    )
    Axios.get("/posts/count").then(response=>{
      this.setState({
        dataCount: response.data,
      })
    });
  }

  handleTabChange = tab => {
    
    const { page, rowsPerPage } = this.state;
    this.setState({
      status: tab,
    })
    this.loadData(page+1, rowsPerPage, tab);
    
    
  }

  handleDeleteMany = () => {
      const { selected, page, rowsPerPage,status } = this.state;
      const condition = {
        _id: {$in: selected}
      };
      const callback = response => {
        if(response.data.ok===1){
         this.loadData(page+1,rowsPerPage, status);
        }
      }
      
      if(!window.confirm("是否删除这些选中项？")){
        return false;
      }
      if(status === "deleted"){
        return Axios.delete("/api/posts", {
          params: {condition}
        }).then(callback);
      }
      
     Axios.patch("/api/posts", {
       condition,
       data: {
         status: "deleted"
       }
     }).then(callback);
     Axios.get("/posts/count?status="+status).then(response=>{
      this.setState({
        dataCount: response.data,
      })
    });
      
  }

  changeItemStatus = (e, id, status) => {
    e.stopPropagation();
    const { page, rowsPerPage } = this.state;
    this.setState({
      status,
    });
    Axios.patch(`/api/posts/${id}`, {status}).then(
      response => {
        
        if(response.data._id === id){
          this.loadData(page+1, rowsPerPage, status);
        }
      }
    )
  }

  render() {
    const { classes, rows, label, DataItemComponent, statuses } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, pending, dataCount, dialogOpen, status } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} onScroll={e=> console.log(e.target)}>
        <StatusTabs currentStatus={status} statuses={statuses} onTabChange={this.handleTabChange}/>
        <EnhancedTableToolbar numSelected={selected.length} label={label} onDeleteMany={this.handleDeleteMany}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              rows={rows}
              label={label}
            />
            <TableBody>
                {
                    pending && 
                    <tr style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignContent: "center",
                        alignItems: "center",
                        position: "fixed",
                        top: "50%",
                        zIndex: "1200"
                    }}>
                        <Typography variant="h3">请稍后</Typography>
                        <CircularProgress  color="primary" size={100}/>
                    </tr>
                }
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n._id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n._id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n._id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>

                      <DataItemComponent item={n}/>
                      <TableCell align="right">
                        <Button variant="outlined" color="secondary" size="small" onClick={e => this.handleDelete(e, n._id)}>删除<DeleteIcon /></Button>
                        {n.status === "draft" &&<Button variant="outlined" color="inherit" size="small" onClick={e => this.changeItemStatus(e, n._id, "published")}>发布</Button>}
                        {n.status === "published" &&<Button variant="outlined" color="inherit" size="small" onClick={e => this.changeItemStatus(e, n._id, "draft")}>保存到草稿</Button>}
                        {n.status === "deleted" &&<Button variant="outlined" color="inherit" size="small" onClick={e => this.changeItemStatus(e, n._id, "draft")}>恢复到草稿</Button>}
                        <Button variant="outlined" color="primary" size="small" onClick={this.handleEdit} component="a" href={`/posts/${n._id}/edit`} >编辑<EditIcon /></Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[25,50,75]}
          component="div"
          count={dataCount}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': '上一页',
          }}
          nextIconButtonProps={{
            'aria-label': '下一页',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          labelRowsPerPage={"每页显示"}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to}/ ${count}`}
        />
        <AlertDialog content="是否确定删除？" open={dialogOpen} title="删除确认" handleCancel={this.handleComfirmDialogCancel} handleConfirm={this.handleComfirmDialogConfirm} />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);