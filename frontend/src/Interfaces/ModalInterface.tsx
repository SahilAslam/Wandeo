export interface ModalProps {
  visible: boolean;
  closeModal: () => void;
  userName: any;
  id: any;
  updateUI: (data: any) => void;
  setUpdateUI: (data: any) => void;
  deleteGroup: () => void;
  LeaveEvent: () => void;
  LeaveGroup: () => void;
}
