import { deleteCardAPI, updateCardAPI } from '@/apis/cards.api'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import SubtitlesOutlinedIcon from '@mui/icons-material/SubtitlesOutlined'
import { Grid, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useConfirm } from 'material-ui-confirm'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Attachments from './Attachments/Attachments'
import AttachmentsPopover from './AttachmentsPopover/AttachmentsPopover'
import CoverPopover from './CoverPopover/CoverPopover'
import Description from './Description/Description'
import DatePopover from './DatePopover/DatePopover'
import DateTimes from './DateTimes/DateTimes'

const chipStyle = {
  fontSize: '15px',
  justifyContent: 'start',
  borderRadius: '4px',
  width: '100%',
  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#353b48' : '#dfe6e9'),
  border: 'none'
}

export default function ModalCardDetails({ open, onClose, card, columnTitle }) {
  const [openNewCardTitleForm, setOpenNewCardTitleForm] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  useEffect(() => {
    if (card) {
      setNewCardTitle(card.title)
    }
  }, [card])

  const queryClient = useQueryClient()

  const mutionEditCardTitle = useMutation({
    mutationFn: (data) => updateCardAPI(card._id, data)
  })

  const editCardTitle = () => {
    if (newCardTitle === card.title || !newCardTitle) {
      setOpenNewCardTitleForm(false)
      setNewCardTitle(card.title)
      return
    }

    mutionEditCardTitle.mutate(
      {
        title: newCardTitle
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['board'] })
          toast.success('Edit Column Title is successfully!')
        }
      }
    )
    setOpenNewCardTitleForm(false)
  }

  const mutionDeleteColumn = useMutation({
    mutationFn: (id) => deleteCardAPI(id)
  })

  const confirm = useConfirm()

  const handleDeleteCard = () => {
    confirm({
      title: 'Delete Card ?',
      description:
        'All actions will be removed from the activity feed and you wont be able to re-open the card. There is no undo.',
      confirmationText: 'Confirm',
      dialogProps: { maxWidth: 'xs' },
      confirmationButtonProps: { color: 'warning' }
    })
      .then(() => {
        mutionDeleteColumn.mutate(card._id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['board'] })
            toast.success('Deleted card is successfully')
          }
        })
      })
      .catch(() => {})
  }

  return (
    <Box>
      <Modal
        data-no-dnd
        open={open}
        onClose={onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2f3542' : '#ebecf0'),
            borderRadius: '5px',
            '&:focus': { outline: 'none' }
          }}
        >
          <Box
            sx={{
              p: '0 2px 0 0',
              width: { xs: 350, md: 800 },
              maxWidth: { xs: 350, md: 800 },
              height: { xs: 700, md: 700 },
              maxHeight: { xs: 700, md: 800 },
              overflowY: 'auto',
              overflowX: 'hidden',
              '&::-webkit-scrollbar-track': {
                m: 1
              }
            }}
          >
            {card.cover && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#b2bec3' : '#dfe6e9'),
                  borderRadius: '5px 5px 0 0',
                  position: 'relative'
                }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5
                  }}
                  onClick={onClose}
                >
                  <CloseIcon />
                </IconButton>
                <img height={170} src={card.cover} alt='Card Cover' />
              </Box>
            )}
            <Grid container>
              <Grid item xs={7} md={9} sx={{ overflowY: 'auto' }}>
                <Box
                  sx={{
                    p: 2
                  }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '40px' }}
                    onClick={() => setOpenNewCardTitleForm(true)}
                  >
                    <SubtitlesOutlinedIcon />
                    <Box sx={{ width: '100%' }}>
                      {openNewCardTitleForm ? (
                        <Box
                          as='form'
                          onSubmit={(e) => {
                            e.preventDefault()
                            editCardTitle()
                          }}
                        >
                          <TextField
                            fullWidth
                            type='text'
                            value={newCardTitle}
                            onBlur={editCardTitle}
                            autoFocus
                            data-no-dnd='true'
                            onChange={(e) => setNewCardTitle(e.target.value)}
                            size='small'
                            sx={{
                              '& label': {
                                color: 'text.primary'
                              },

                              '& label.Mui-focused': {
                                color: (theme) => theme.palette.primary.main
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                                '&:hover fieldset': {
                                  borderColor: (theme) => theme.palette.primary.main
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: (theme) => theme.palette.primary.main
                                }
                              },
                              '& .MuiOutlinedInput-input': {
                                borderRadius: 1
                              }
                            }}
                          />
                        </Box>
                      ) : (
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
                          id='modal-modal-title'
                        >
                          {newCardTitle}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <SubtitlesOutlinedIcon sx={{ color: 'transparent' }} />{' '}
                    <Typography>In list {columnTitle}</Typography>
                  </Box>

                  <DateTimes card={card} />

                  <Description card={card} />

                  <Attachments attachment={card.attachment} />
                </Box>
              </Grid>

              <Grid item xs={6} md={3}>
                {!card?.cover && (
                  <Box
                    sx={{
                      textAlign: 'end',
                      mx: 1,
                      mb: 3
                    }}
                  >
                    <IconButton onClick={onClose}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography>Suggested</Typography>
                  <Chip
                    icon={<PersonOutlineOutlinedIcon fontSize='small' />}
                    sx={chipStyle}
                    label='Join'
                    clickable
                    variant='outlined'
                  />
                  <Typography>Add to card</Typography>
                  <DatePopover card={card} />
                  <Chip icon={<GroupAddOutlinedIcon />} sx={chipStyle} label='Members' clickable variant='outlined' />
                  <Chip icon={<LocalOfferOutlinedIcon />} sx={chipStyle} label='Labels' clickable variant='outlined' />
                  <CoverPopover card={card} />

                  <AttachmentsPopover card={card} />
                  <Chip
                    icon={<LibraryAddCheckOutlinedIcon />}
                    sx={chipStyle}
                    label='Checklist'
                    clickable
                    variant='outlined'
                  />
                  <Typography>Actions</Typography>
                  <Chip
                    onClick={handleDeleteCard}
                    icon={<DeleteOutlineOutlinedIcon />}
                    sx={{
                      ...chipStyle,
                      '&:hover': {
                        color: 'error.light',
                        '& .MuiChip-iconColorDefault': {
                          color: 'error.light'
                        }
                      }
                    }}
                    label='Delete'
                    clickable
                    variant='outlined'
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
