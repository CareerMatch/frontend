import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";

export function TnCSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
               <span
                   className="text-blue-600 underline cursor-pointer"
                   role="button"
               >
                   Terms & Conditions
                </span>
            </SheetTrigger>
            <SheetContent size="lg" className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Terms & Conditions</SheetTitle>
                    <SheetDescription>Last Updated: January 5, 2025</SheetDescription>
                </SheetHeader>
                <div className="p-4">
                    <p>
                        At Career Match, we strive to provide a safe and professional platform for job seekers and employers. These Terms & Conditions outline your rights, responsibilities, and obligations when using our platform. By accessing or using Career Match, you agree to these terms. If you have any questions, please contact us at <a href="mailto:bagusnugrahaxd@gmail.com" className="text-blue-600 underline">bagusnugrahaxd@gmail.com</a>.
                    </p>
                    <h3 className="font-semibold mt-4">1. Account Registration</h3>
                    <ul className="list-disc pl-6">
                        <li>1.1. You must provide accurate and complete information during registration.</li>
                        <li>1.2. You are responsible for maintaining the confidentiality of your login credentials.</li>
                        <li>1.3. You may not use the platform for fraudulent, illegal, or unauthorized purposes.</li>
                    </ul>

                    <h3 className="font-semibold mt-4">2. Content and Ownership</h3>
                    <ul className="list-disc pl-6">
                        <li>2.1. Users retain ownership of the content they upload, such as CVs or job listings.</li>
                        <li>2.2. Career Match is not liable for inaccuracies in user-generated content.</li>
                    </ul>

                    <h3 className="font-semibold mt-4">3. Acceptable Use</h3>
                    <ul className="list-disc pl-6">
                        <li>3.1. Users must comply with all applicable laws and regulations.</li>
                        <li>3.2. You may not post offensive, misleading, or unlawful content on the platform.</li>
                    </ul>

                    <h3 className="font-semibold mt-4">4. Security</h3>
                    <ul className="list-disc pl-6">
                        <li>4.1. We implement reasonable security measures to protect user data, but no system is entirely secure.</li>
                    </ul>

                    <h3 className="font-semibold mt-4">5. Account Deletion</h3>
                    <ul className="list-disc pl-6">
                        <li>5.1. You may delete your account by contacting <a href="mailto:bagusnugrahaxd@gmail.com" className="text-blue-600 underline">bagusnugrahaxd@gmail.com</a> until frontend functionality is available.</li>
                    </ul>

                    <h3 className="font-semibold mt-4">6. Limitation of Liability</h3>
                    <ul className="list-disc pl-6">
                        <li>6.1. Career Match is not liable for direct or indirect damages arising from your use of the platform.</li>
                    </ul>

                    <h3 className="font-semibold mt-4">7. Amendments</h3>
                    <ul className="list-disc pl-6">
                        <li>7.1. We reserve the right to update these terms. Changes will be communicated via email or posted on the platform.</li>
                    </ul>

                    <h3 className="font-semibold mt-4">8. Contact Information</h3>
                    <p>
                        For any questions about these Terms & Conditions, please contact:
                        <br />
                        <strong>Career Match</strong>
                        <br />
                        Email: <a href="mailto:bagusnugrahaxd@gmail.com" className="text-blue-600 underline">bagusnugrahaxd@gmail.com</a>
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}