'use client'

import { useState, useRef } from "react";
import {
    KnockProvider,
    KnockFeedProvider,
    NotificationIconButton,
    NotificationFeedPopover,
    NotificationCell,
} from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Notification } from "iconsax-react";

export const NotificationKnock = () => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const [userInfo, setUserInfo] = useState();

    return (
        <KnockProvider
            apiKey={"pk_test_JO65C9v8tNEf2aLZMMjjEbmp_c4Hos2D8U6wCHzzswI"}
            // userId={currentUser.id}
            userId={112233}
        >
            <KnockFeedProvider feedId={"fc0460b0-11f7-46fa-bd57-6c9e31e53896"}>
                <>
                    {/* <NotificationIconButton
                        ref={notifButtonRef}
                        onClick={(e) => setIsVisible(!isVisible)}
                    /> */}
                    <Notification
                        ref={notifButtonRef}
                        onClick={(e) => setIsVisible(prev => !prev)}
                        size="24"
                        color="#344054"
                        className="cursor-pointer"
                    />
                    <NotificationFeedPopover
                        onNotificationClick={(e) => alert(e.data.variableKey)}
                        buttonRef={notifButtonRef}
                        isVisible={isVisible}
                        onClose={() => setIsVisible(false)}
                        renderItem={({ item, ...props }) => {
                            setUserInfo(item);
                            //get user identify for set image
                            console.log(item.actors[0].email, 'check user info here')
                            return (
                                <NotificationCell
                                    {...props}
                                    item={item}
                                    //custom user profile
                                    // url from firebase
                                    // https://firebasestorage.googleapis.com/v0/b/cloud-storage-next-8e2cc.appspot.com/o/Approval%202.jpg?alt=media&token=4499901a-d902-42a5-b565-5b7316a580ce
                                    avatar={
                                        <Avatar className="object-cover">
                                            <AvatarImage
                                                className="object-cover"
                                                src={item.actors[0].email == 'meganotclone@gmail.com' ?
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnSiGn-0VCvgAGZrR6ykA37ZsQUOmcPAejyA&s"
                                                    : item.actors[0].email == 'stacknote@mega.com' ?
                                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-fw3jsc4Hi2__Dx15RL2D7VWyT-5vYuq8w&s"
                                                        : "https://i.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1280&format=png&auto=webp&s=7177756d1f393b6e093596d06e1ba539f723264b"
                                                }
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    }
                                />
                            )
                        }}
                    />
                </>
            </KnockFeedProvider>
        </KnockProvider >
    );
}