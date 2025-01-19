import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { logout} from "@/redux/authSlice.ts";
import {RootState} from "@/redux/store.ts";

const subMenuItemsOne = [
    {
        title: "Blog",
        description: "The latest industry news, updates, and info",
        icon: <Book className="size-5 shrink-0" />,
    },
    {
        title: "Company",
        description: "Our mission is to innovate and empower the world",
        icon: <Trees className="size-5 shrink-0" />,
    },
    {
        title: "Careers",
        description: "Browse job listing and discover our workspace",
        icon: <Sunset className="size-5 shrink-0" />,
    },
    {
        title: "Support",
        description:
            "Get in touch with our support team or visit our community forums",
        icon: <Zap className="size-5 shrink-0" />,
    },
];

const subMenuItemsTwo = [
    {
        title: "Help Center",
        description: "Get all the answers you need right here",
        icon: <Zap className="size-5 shrink-0" />,
    },
    {
        title: "Contact Us",
        description: "We are here to help you with any questions you have",
        icon: <Sunset className="size-5 shrink-0" />,
    },
    {
        title: "Status",
        description: "Check the current status of our services and APIs",
        icon: <Trees className="size-5 shrink-0" />,
    },
    {
        title: "Terms of Service",
        description: "Our terms and conditions for using our services",
        icon: <Book className="size-5 shrink-0" />,
    },
];

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    // Check for access token in cookies on component mount
    useEffect(() => {
    console.log("Access token is =",Cookies.get("accessToken"));
    }, []);


    // Logout handler
    const handleLogout = async () => {
        const result = await dispatch<any>(logout());
        if (result.meta.requestStatus === 'fulfilled') {
            Cookies.remove("accessToken"); // Remove the cookie
            Cookies.remove("refreshToken");
        }
    };

    return (
        <section className="p-4">
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <img src="https://shadcnblocks.com/images/block/block-1.svg" className="w-8" alt="logo"/>
                            <span className="text-xl font-bold">Careeermatch</span>
                        </div>
                        <div className="flex items-center">
                            <a
                                className={cn(
                                    "text-muted-foreground",
                                    navigationMenuTriggerStyle,
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                )}
                                href="#"
                            >
                                Home
                            </a>
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem className="text-muted-foreground">
                                        <NavigationMenuTrigger>
                                            <span>Products</span>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-80 p-3">
                                                <NavigationMenuLink>
                                                    {subMenuItemsOne.map((item, idx) => (
                                                        <li key={idx}>
                                                            <a
                                                                className={cn(
                                                                    "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                                )}
                                                                href="#"
                                                            >
                                                                {item.icon}
                                                                <div>
                                                                    <div className="text-sm font-semibold">
                                                                        {item.title}
                                                                    </div>
                                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </NavigationMenuLink>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="text-muted-foreground">
                                        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="w-80 p-3">
                                                <NavigationMenuLink>
                                                    {subMenuItemsTwo.map((item, idx) => (
                                                        <li key={idx}>
                                                            <a
                                                                className={cn(
                                                                    "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                                )}
                                                                href="#"
                                                            >
                                                                {item.icon}
                                                                <div>
                                                                    <div className="text-sm font-semibold">
                                                                        {item.title}
                                                                    </div>
                                                                    <p className="text-sm leading-snug text-muted-foreground">
                                                                        {item.description}
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </NavigationMenuLink>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>

                            <a
                                className={cn(
                                    "text-muted-foreground",
                                    navigationMenuTriggerStyle,
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                )}
                                href="#"
                            >
                                Pricing
                            </a>
                            <a
                                className={cn(
                                    "text-muted-foreground",
                                    navigationMenuTriggerStyle,
                                    buttonVariants({
                                        variant: "ghost",
                                    }),
                                )}
                                href="#"
                            >
                                Blog
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-2 ml-auto">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">
                                Hi, User!
                            </span>
                                <Button className="bg-red-700 text-white" variant="outline" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => navigate("/signin")}>
                                    Log in
                                </Button>
                                <Button onClick={() => navigate("/signup")}>Sign up</Button>
                            </>
                        )}
                    </div>
                </nav>
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src="https://shadcnblocks.com/images/block/block-1.svg" className="w-8" alt="logo"/>
                            <span className="text-xl font-bold">Careeermatch</span>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src="https://shadcnblocks.com/images/block/block-1.svg"
                                                className="w-8"
                                                alt="logo"
                                            />
                                            <span className="text-xl font-bold">Careeermatch</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mb-8 mt-8 flex flex-col gap-4">
                                    <a href="#" className="font-semibold">
                                        Home
                                    </a>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="products" className="border-b-0">
                                            <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline">
                                                Products
                                            </AccordionTrigger>
                                            <AccordionContent className="mt-2">
                                                {subMenuItemsOne.map((item, idx) => (
                                                    <a
                                                        key={idx}
                                                        className={cn(
                                                            "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                        )}
                                                        href="#"
                                                    >
                                                        {item.icon}
                                                        <div>
                                                            <div className="text-sm font-semibold">
                                                                {item.title}
                                                            </div>
                                                            <p className="text-sm leading-snug text-muted-foreground">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="resources" className="border-b-0">
                                            <AccordionTrigger className="py-0 font-semibold hover:no-underline">
                                                Resources
                                            </AccordionTrigger>
                                            <AccordionContent className="mt-2">
                                                {subMenuItemsTwo.map((item, idx) => (
                                                    <a
                                                        key={idx}
                                                        className={cn(
                                                            "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                        )}
                                                        href="#"
                                                    >
                                                        {item.icon}
                                                        <div>
                                                            <div className="text-sm font-semibold">
                                                                {item.title}
                                                            </div>
                                                            <p className="text-sm leading-snug text-muted-foreground">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <a href="#" className="font-semibold">
                                        Pricing
                                    </a>
                                    <a href="#" className="font-semibold">
                                        Blog
                                    </a>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="grid grid-cols-2 justify-start">
                                        <a
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                }),
                                                "justify-start text-muted-foreground",
                                            )}
                                            href="#"
                                        >
                                            Press
                                        </a>
                                        <a
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                }),
                                                "justify-start text-muted-foreground",
                                            )}
                                            href="#"
                                        >
                                            Contact
                                        </a>
                                        <a
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                }),
                                                "justify-start text-muted-foreground",
                                            )}
                                            href="#"
                                        >
                                            Imprint
                                        </a>
                                        <a
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                }),
                                                "justify-start text-muted-foreground",
                                            )}
                                            href="#"
                                        >
                                            Sitemap
                                        </a>
                                        <a
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                }),
                                                "justify-start text-muted-foreground",
                                            )}
                                            href="#"
                                        >
                                            Legal
                                        </a>
                                        <a
                                            className={cn(
                                                buttonVariants({
                                                    variant: "ghost",
                                                }),
                                                "justify-start text-muted-foreground",
                                            )}
                                            href="#"
                                        >
                                            Cookie Settings
                                        </a>
                                    </div>
                                    <div className="mt-2 flex flex-col gap-3">
                                        <Button  onClick={() => navigate("/signin")}>
                                            Log in
                                        </Button>
                                        <Button  onClick={() => navigate("/signup")}>
                                            Sign up
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
        </section>
    );
};

export default Navbar;
