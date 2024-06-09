import React, {useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import {EditIcon} from "@/components/Icon";
// import {DeleteIcon} from "./DeleteIcon";
import {EyeIcon} from "@/components/Icon";
import {columns, users} from "@/assets/data";
import Modalx from '@/components/Modal.jsx';
import {Button} from "@nextui-org/react";
import '@/app/globals.css';
import Searchbar from "./Searchbar";
const statusColorMap = {
    Delivered: "success",
    Pending : "danger",
    Dispatch: "warning",
};


export default function App() {


  

  const handleclick = () => {
    document.getElementById('my_modal_5').showModal()
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    // const [trackingId, setTrackingId] = useState(""); 
    // console.log(cellValue)

    switch (columnKey) {
      // case "name":
      //   return (
      //     <User
      //       avatarProps={{radius: "lg", src: user.avatar}}
      //       description={user.email}
      //       name={cellValue}
      //     >
      //       {user.email}
      //     </User>
      //   );
      case "tracking":
        return (
            <div >
            {user.TrackingId ? (
              <p >{user.TrackingId}</p>
            ) :  (
              <Button
                className="update-btn"
            //     key={index}
            //     id={user.id}
            //     onClick={() => {
            //       // handleChange(); // Assuming handleChange is a function defined elsewhere
            //       handleclick(); // Assuming handleclick is a function defined elsewhere
            //       setUserid((prevEditable) => {
            //         const newEditable = [...prevEditable]; // Create a copy of the array
            //         newEditable[user.id] = true;
                    
            //         const value = [user.id]// Set the specific index to true
            //         return value;
            //       });
            //   }}
              
                // onOpenChange={onOpenChange} 
                // value={trackingId}
                >
                Update
              </Button>
            )}
          </div>
        );
        case "address":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{user.address.street}</p>
                <p className="text-bold text-sm capitalize text-default-400">{user.address.state+"," + user.address.pincode}</p>
              </div>
            );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onclick={handleclick}/>
              </span>
            </Tooltip>
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>

            
            {/* <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip> */}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center  h-screen w-screen  custom-gradient-black lg:p-20   md:p-10 overflow-hidden">
      <Searchbar />
  <Table aria-label="Example table with custom cells"
  
  isHeaderSticky
  classNames={{
       
    base: "max-h-[80vh] overflow-auto",
    wrapper: "custom-gradient-grey p-0 pt-2 pl-1  ",
    
         th: "p-3 bg-zinc-900 rounded-[17px 0px 0px 17px] shadow shadow-inner  overflow-hidden"
    
  }}
  
  >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "end"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    <Modalx/>
    </div>
  );
}
