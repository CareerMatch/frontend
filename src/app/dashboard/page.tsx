import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {useEffect, useState} from "react";
import {authService} from "@/api/authService.ts";
import {userService} from "@/api/userService.ts";

const handleEdit = (id: string) => {
  // Implement edit functionality
  console.log(`Edit user with id: ${id}`);
};

const handleDelete = (id: string) => {
  // Implement delete functionality
  console.log(`Delete user with id: ${id}`);
};

export default function DashboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      // Fetch data from both APIs
      const authResponse = await authService.getAllUsers(); // Fetch Auth data
      const userResponse = await userService.getAllUsers(); // Fetch User data
      console.log(userResponse);
      console.log(authResponse);

      // Merge the data
      const mergedData = userResponse.map((user: any) => {
        const auth = authResponse.find(
            (auth: any) => auth.userId === user.userId
        )
        return {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: auth?.email || "N/A", // Fallback if email is not found
          dateOfBirth: new Date(user.dateOfBirth).toISOString().split("T")[0], // Format date
        };
      });

      setUsers(mergedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log();
    fetchUserData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    User List
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block"/>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="overflow-x-auto rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, index) => (
                        <TableRow
                            key={user.userId}
                            id={`user-row-${user.userId}`}
                            className={
                              index % 2 === 0
                                  ? "bg-white dark:bg-zinc-800"
                                  : "bg-zinc-100 dark:bg-zinc-700"
                            }
                        >
                          <TableCell id={`user-firstName-${user.userId}`}>{user.firstName}</TableCell>
                          <TableCell id={`user-lastName-${user.userId}`}>{user.lastName}</TableCell>
                          <TableCell id={`user-email-${user.userId}`}>{user.email}</TableCell>
                          <TableCell id={`user-dob-${user.userId}`}>{user.dateOfBirth}</TableCell>
                          <TableCell id={`user-dropdownMenu-${user.userId}`}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
            )}
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-zinc-100/50 md:min-h-min dark:bg-zinc-800/50"/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
