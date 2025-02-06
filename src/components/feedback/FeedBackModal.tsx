// components/SupportModal.tsx
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@heroui/react";
import { useTranslations } from 'next-intl';
import { BugReport, Lightbulb, Feedback } from '@mui/icons-material';

import BackArrowIcon from '../icons/BackArrow';

import ReportBug from "./ReportBug";
import ProvideFeedback from "./ProvideFeedback";
import RequestFeature from "./RequestFeature";


interface SupportModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onOpenChange }) => {
    const t = useTranslations('FeedBackModal');
    const [currentView, setCurrentView] = useState<string>("");

    const handleButtonClick = (view: string) => {
        setCurrentView(view);
    };

    const handleBackClick = () => {
        setCurrentView("");
    };

    const buttons = [
        {
            id: 'bug',
            icon: <BugReport />,
            label: t('ReportBug'),
        },
        {
            id: 'feature',
            icon: <Lightbulb />,
            label: t('RequestFeature'),
        },
        {
            id: 'feedback',
            icon: <Feedback />,
            label: t('ProvideFeedback'),
        },
    ];

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col">
                    {currentView !== "" && (
                        <Button
                            onPress={handleBackClick}
                            variant="light"
                            isIconOnly
                        >
                            <BackArrowIcon />
                        </Button>
                    )}
                </ModalHeader>
                <ModalBody>
                    {currentView === "" && (
                        <div className="flex justify-between gap-4">
                            {buttons.map((button) => (
                                <Button
                                    key={button.id}
                                    onClick={() => handleButtonClick(button.id)}
                                    className="w-1/3 flex flex-col items-center h-auto p-4 shadow-md"
                                    variant="bordered"
                                >
                                    <div className="flex flex-col items-center p-3">
                                        {button.icon}
                                        <span className="text-center w-full break-words">{button.label}</span>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    )}

                    {currentView === "bug" && (<ReportBug />)}
                    {currentView === "feature" && (<RequestFeature />)}
                    {currentView === "feedback" && (<ProvideFeedback />)}
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal >
    );
};

export default SupportModal;
