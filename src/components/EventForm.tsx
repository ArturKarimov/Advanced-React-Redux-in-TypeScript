import React, {FC, useState} from 'react'
import {Button, DatePicker, Form, Input, Row, Select} from "antd"
import {rules} from "../utils/rules"
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";


interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {

    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent)

    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>

            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required(), rules.isDateAfter('Нельзя создать событие в прошлом')]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>

            <Form.Item
                label="Выбрать пользователя"
                name="select"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option value={guest.username} key={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8}}>
                <Row justify='end'>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default EventForm