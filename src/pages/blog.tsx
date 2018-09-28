import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import { RouteComponentProps } from 'react-router';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { PostService, Post } from '../services/PostService';
import Modal from '@material-ui/core/Modal';

const styles: StyleRulesCallback<any> = theme => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    toolbarMain: {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    toolbarTitle: {
      flex: 1,
    },
    toolbarSecondary: {
      justifyContent: 'space-between',
    },
    mainFeaturedPost: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing.unit * 4,
    },
    mainFeaturedPostContent: {
      padding: `${theme.spacing.unit * 6}px`,
      [theme.breakpoints.up('md')]: {
        paddingRight: 0,
      },
    },
    mainGrid: {
      marginTop: theme.spacing.unit * 3,
    },
    card: {
      display: 'flex',
      
    },
    cardDetails: {
      flex: 1,
      
    },
    cardMedia: {
      width: 160,
    },
    markdown: {
      padding: `${theme.spacing.unit * 3}px 0`,
    },
    sidebarAboutBox: {
      padding: theme.spacing.unit * 2,
      backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
      marginTop: theme.spacing.unit * 3,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing.unit * 8,
      padding: `${theme.spacing.unit * 6}px 0`,
    },
  });
  
  const sections = [
    'Beleriand',
    'Eriador',
    'Rhovanion',
    'Rhûn',
    'Harad',
    'Amon Hen',
    'Ered Luin',
    'Weathertop ',
    'Bree-land',
    'Lothlórien',
  ];
  
  const featuredPost = 
    {
      id: 1,
      title: 'The Fellowship is Broken',
      dateCreated: new Date(),
      dateModified: new Date(),
      body:
        'Frodo and Samewise head east down the river, Merry and Pippin missing!',
    };

  
  const archives = [
    'ElderDays',
    'Dark Years',
    'Watchful Peace',
    'First Age',
    'Second Age',
    'Third Age',
    'Fourth Age',
  ];
  
  const social = ['GitHub', 'Twitter', 'Facebook'];

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: '50%',
      left: '50%',
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

export namespace Blog {
    export interface Props extends RouteComponentProps<void>, WithStyles<any> {

    }
    export interface State {
        posts: Post[],
        open: boolean
    }
}

class Blog extends React.Component<Blog.Props, Blog.State> {
    constructor(props: Blog.Props) {
        super(props);
        this.state = {
            posts : [],
            open: false
        }
    }

    componentDidMount() {
        PostService.getPosts().then((posts) => {
            this.setState({ posts: posts.sort(this.sortByDateModified) });
        })
    }


    sortByDateModified = (a: Post, b: Post) => {
        if (a.dateModified < b.dateModified) {
            return 1;
        } else if (a.dateModified > b.dateModified) {
            return -1;
        } else {
            return 0;
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        
        const { classes } = this.props;

        const modal =  <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
        >
            <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
                Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            </div>
        </Modal>

        return (
            <div>
                {modal}
            <div className={classes.layout}>
            <Toolbar className={classes.toolbarMain}>
              <Button size="small">Subscribe</Button>
              <Typography
                variant="headline"
                color="inherit"
                align="center"
                noWrap
                className={classes.toolbarTitle}
              >
                Blog
              </Typography>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <Button variant="outlined" size="small">
                Sign up
              </Button>
            </Toolbar>
            <Toolbar variant="dense" className={classes.toolbarSecondary}>
              {sections.map(section => (
                <Typography color="inherit" noWrap key={section}>
                  {section}
                </Typography>
              ))}
            </Toolbar>
            <main>
              {/* Main featured post */}
              <Paper className={classes.mainFeaturedPost}>
                <Grid container>
                  <Grid item md={12}>
                    <div className={classes.mainFeaturedPostContent}>
                      <Typography variant="display2" color="inherit" gutterBottom>
                      Gandalf the White
                      </Typography>
                      <Typography variant="headline" color="inherit" paragraph>
                      There was no lie in Pippin's eyes. A fool, but an honest fool he remains. He told Sauron nothing of Frodo and the Ring. We've been strangely fortunate. Pippin saw in the Palantír a glimpse of the Enemy's plan. Sauron moves to strike the city of Minas Tirith. His defeat at Helm's Deep showed our Enemy one thing. He knows the Heir of Elendil has come forth. Men are not as weak as he supposed. There is courage still, strength enough perhaps to challenge him. Sauron fears this. He will not risk the Peoples of Middle Earth uniting under one banner. He will raze Minas Tirith to the ground before he sees a King return to the Throne of Men. If the Beacons of Gondor are lit, Rohan must be ready for war.            
                      </Typography>
                      <Typography variant="title" color="inherit">
                        Continue reading...
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
              {/* End main featured post */}
              {/* Sub featured posts */}
              <Grid container spacing={40} className={classes.cardGrid}>             
                  <Grid item key={featuredPost.title} xs={12} md={12}>
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography variant="headline">{featuredPost.title}</Typography>
                          <Typography variant="subheading" color="textSecondary">
                            {featuredPost.dateCreated.getDate()}
                          </Typography>
                          <Typography variant="subheading" paragraph>
                            {featuredPost.body}
                          </Typography>
                          <Typography variant="subheading" color="primary">
                            Continue reading...
                          </Typography>
                        </CardContent>
                      </div>
                      <Hidden xsDown>
                        <CardMedia
                          className={classes.cardMedia}
                          image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                          title="Image title"
                        />
                      </Hidden>
                    </Card>
                  </Grid>
              </Grid>
              {/* End sub featured posts */}
              <Grid container spacing={40} className={classes.mainGrid}>
                {/* Main content */}
                <Grid item xs={12} md={8}>
                  <Typography variant="title" gutterBottom>
                    From the Firehose 
                    <Button color="primary" onClick={() => this.setState({open: true})} className={classes.button}>
                        Add New Post
                    </Button>
                  </Typography>
                 
                  <Divider />
                  { this.state.posts.length > 0 
                    &&
                    this.state.posts.map((post : Post)=> (
                        <Card className={classes.card}>
                        <CardContent>
                          <Typography className={classes.title} color="textSecondary">
                            Word of the Day
                          </Typography>
                          <Typography variant="headline" component="h2">
                            {post.title}
                          </Typography>
                          <Typography className={classes.pos} color="textSecondary">
                            {post.dateCreated}
                          </Typography>
                          <Typography component="p">
                            {post.body}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Learn More</Button>
                        </CardActions>
                      </Card>
                    ))
                  }
                </Grid>
                {/* End main content */}
                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                  <Paper elevation={0} className={classes.sidebarAboutBox}>
                    <Typography variant="title" gutterBottom>
                      What's Ringin on the Ring
                    </Typography>
                    <Typography>
                            Ash nazg thrakatulûk agh burzum-ishi krimpatul.
                    </Typography>
                  </Paper>
                  <Typography variant="title" gutterBottom className={classes.sidebarSection}>
                    Archives
                  </Typography>
                  {archives.map(archive => (
                    <Typography key={archive}>{archive}</Typography>
                  ))}
                  <Typography variant="title" gutterBottom className={classes.sidebarSection}>
                    Social
                  </Typography>
                  {social.map(network => (
                    <Typography key={network}>{network}</Typography>
                  ))}
                </Grid>
                {/* End sidebar */}
              </Grid>
            </main>
          </div>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="title" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography variant="subheading" align="center" color="textSecondary" component="p">
              Something here to give the footer a purpose!
            </Typography>
          </footer>
          </div>
        );
    }
}

export default withRoot(withStyles(styles)(Blog));