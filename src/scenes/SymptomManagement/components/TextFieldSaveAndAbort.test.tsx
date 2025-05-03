import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react'
import TextFieldSaveAndAbort from './TextFieldSaveAndAbort';
import { act } from 'react';

describe('TextFieldSaveAndAbort', () => {
    const successFn = vi.fn().mockResolvedValue(undefined)
    const cancelFn = vi.fn()

    beforeEach(() => {
        render(<TextFieldSaveAndAbort
            label='label'
            value='value'
            isSaveable={(v) => v != 'value'}
            onSave={successFn}
            onCancel={cancelFn}
            size={'small'} />)
    })

    it('Renders', async () => {
        expect(await screen.findByLabelText('label')).toBeInTheDocument()
        expect(screen.getByDisplayValue('value')).toBeInTheDocument()
        expect(screen.getByTitle('Umbenennen speichern')).toBeDisabled()
        expect(screen.getByTitle('Umbenennen abbrechen')).toBeInTheDocument()

    })

    it('Editing and saving', async () => {
        const textInput = await screen.findByLabelText('label')

        act(() => {
            fireEvent.change(textInput, { target: { value: 'new value' } })
        })
        expect(await screen.findByDisplayValue('new value')).toBeInTheDocument()
        const saveButton = screen.getByTitle('Umbenennen speichern')
        expect(saveButton).not.toBeDisabled()
        await act(async () => {
            fireEvent.click(saveButton)
        })
        expect(successFn).toHaveBeenCalled()
    })


    it('Canceling', async () => {
        const cancelButton = screen.getByTitle('Umbenennen abbrechen')
        act(() => {
            fireEvent.click(cancelButton)
        })
        expect(cancelFn).toHaveBeenCalled()
    })
})

// describe('TextFieldSaveAndAbort', () => {
//     const onDelete = vi.fn().mockResolvedValue(undefined)
//     const onSave = vi.fn().mockResolvedValue(undefined)
//     const successfulFn = vi.fn().mockResolvedValue(undefined)


//     it('Renders without deletion', async () => {
//         render(<TextFieldSaveAndAbort2
//             label='Label'
//             value='Value'
//             isSaveable={() => true}
//             onSave={onSave}
//             size='small'
//         />)

//         expect(screen.getByText('Value')).toBeInTheDocument()
//         expect(screen.getByTitle('Umbenennen')).toBeInTheDocument()

//         expect(screen.queryByTitle('Löschen')).not.toBeInTheDocument()
//     })

//     it('Renders with additional number', async () => {
//         render(<TextFieldSaveAndAbort2
//             label='Label'
//             value='Value'
//             isSaveable={() => true}
//             onSave={onSave}
//             size='small'
//             numberOfObjects={10}
//         />)

//         expect(screen.getByText('Value (10)')).toBeInTheDocument()
//     })

//     it('Rename action', async () => {
//         render(<TextFieldSaveAndAbort2
//             label='Label'
//             value='Value'
//             size='small'
//             onSave={onSave}
//             isSaveable={(v) => v !== 'Value'}
//         />)

//         fireEvent.click(screen.getByTitle('Umbenennen'))

//         const saveButton = await screen.findByTitle('Speichern')
//         expect(saveButton).toBeInTheDocument()
//         expect(saveButton).toBeDisabled()

//         const textField = await screen.findByLabelText('Label')
//         expect(textField).toHaveValue('Value')
//         fireEvent.change(textField, { target: { value: 'New Value' } })
//         expect(textField).toHaveValue('New Value')


//         const cancelButton = await screen.findByTitle('Umbenennen abbrechen')
//         expect(cancelButton).toBeInTheDocument()
//         expect(cancelButton).not.toBeDisabled()

//         expect(saveButton).not.toBeDisabled()
//         fireEvent.click(saveButton)
//         expect(onSave).toHaveBeenCalled()


//         await waitFor(() => {
//             expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
//             expect(screen.getByTitle('Umbenennen')).toBeInTheDocument()
//             expect(screen.getByText('Value')).toBeInTheDocument()
//         })
//     })

//     it('Delete action', async () => {
//         render(<TextFieldSaveAndAbort2
//             label='Label'
//             value='Value'
//             size='small'
//             onSave={onSave}
//             isSaveable={() => true}
//             onDelete={onDelete}
//             isDeletable={true}
//         />)

//         const deleteIcon = screen.getByTitle('Löschen')
//         fireEvent.click(deleteIcon)

//         expect(await screen.findByText('Value wirklich löschen?')).toBeInTheDocument()
//         expect(await screen.findByTitle('Löschen abbrechen')).toBeInTheDocument()

//         const deleteButton = await screen.findByTitle('Löschen bestätigen')
//         expect(deleteButton).toBeInTheDocument()
//         fireEvent.click(deleteButton)
//         await waitFor(() => {
//             expect(onDelete).toHaveBeenCalled()
//         })

//         fireEvent.click(await screen.findByTitle('Löschen'))
//         fireEvent.click(await screen.findByTitle('Löschen abbrechen'))
//         expect(await screen.findByTitle('Löschen')).toBeInTheDocument()
//     })

//     it('Swap action', async () => {
//         render(<TextFieldSaveAndAbort2
//             label='Label'
//             value='Value'
//             size='small'
//             onSave={successfulFn}
//             isSaveable={() => true}
//             onSwap={successfulFn}
//             swapLabel='SwapLabel'
//             categoryId={1}
//             categories={[{ categoryId: 1, categoryName: 'name', symptoms: [] }, { categoryId: 2, categoryName: 'name2', symptoms: [] }]}
//         />)

//         const swapIcon = screen.getByTitle('Tauschen')
//         fireEvent.click(swapIcon)

//         const select = screen.getByRole('combobox')
//         expect(select).toBeInTheDocument()
//         expect(await screen.findByText('name'))
//         fireEvent.click(select)
//         expect(await screen.findByText('name'))
//         // expect(await screen.findByText('name2'))

//         expect(screen.getByTitle('Tauschen bestätigen')).toBeDisabled()
//         fireEvent.click(screen.getByTitle('Tauschen abbrechen'))

//         expect(await screen.findByTitle('Tauschen')).toBeInTheDocument()
//     })
// })