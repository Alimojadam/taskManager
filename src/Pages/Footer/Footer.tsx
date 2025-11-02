


const Footer=()=>{
    interface SocialLink {
        name: string;
        iconClass: string;
    }
    interface titleLinks{
        title: string;
    }

    const socialLinks: SocialLink[] = [
        { name: "GitHub", iconClass: "bi bi-github text-[#2C3E50]" },
        { name: "LinkedIn", iconClass: "bi bi-linkedin text-[#E74C3C]" },
        { name: "Twitter", iconClass: "bi bi-twitter text-[#4A90E2]" },
        { name: "Facebook", iconClass: "bi bi-facebook text-[#4A90E2]"}
    ];
    const titleLinks:titleLinks[]= [
        {title: "منابع",},
        {title: "محصول"},
        {title: "شرکت"}
    ]
    


    return(
        <div className="w-[90%] lg:w-[75%] py-5 flex justify-between items-center">
            <div className="flex flex-row-reverse gap-5">
                {socialLinks.map((item, index) => (
                    <li className="cursor-pointer" key={index}>
                        <i className={item.iconClass + " text-xl"}></i>
                    </li>
                ))}
            </div>
            <div className="flex flex-row-reverse gap-5">
                {titleLinks.map((item, index) => (
                    <li className="cursor-pointer" key={index}>
                        <p className="text-[17px] text-[#2C3E50]">{item.title}</p>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default Footer;