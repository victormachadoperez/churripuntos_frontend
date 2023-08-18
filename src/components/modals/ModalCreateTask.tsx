import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Task } from "../../hooks/useSpace";
import { FieldValues, useForm } from "react-hook-form";
import { BiSolidBullseye } from "react-icons/bi";
import { EditIcon } from "@chakra-ui/icons";

const CBiSolidBullseye = chakra(BiSolidBullseye);

interface Props {
  children: ReactNode;
  onAccept: (task: Task) => void;
}

const ModalCreateTask = ({ children, onAccept }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();

  const onCloseModal = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: FieldValues) => {
    const task: Task = {
      taskname: data.taskname,
      points: data.points,
      _id: "",
    };
    onAccept(task);
    onCloseModal();
  };

  return (
    <>
      <div
        onClick={() => {
          onOpen();
        }}
      >
        {children}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onCloseModal();
        }}
        isCentered
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create new task</ModalHeader>

          <ModalBody>
            <form id="taskAddForm" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} p={1} boxShadow="md">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EditIcon color="gray.300" />}
                    />
                    <Input
                      {...register("taskname")}
                      type="text"
                      placeholder="Task name"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CBiSolidBullseye color="gray.300" />}
                    />
                    <Input
                      {...register("points", { valueAsNumber: true })}
                      type="number"
                      placeholder="Points"
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onCloseModal();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" form="taskAddForm" colorScheme="blue">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateTask;